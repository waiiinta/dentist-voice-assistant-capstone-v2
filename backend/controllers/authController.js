
import User from "./../models/userModel.js"
import AppError from "./../utils/appError.js"
import sendEmail from "./../utils/email.js"
import createExcel from "./../utils/createExcelFile.js"
import {verificationContent} from "./../utils/verifyEmail.js"
import env from "../config/config.js"
import {hashUtil,jwtGenerate} from "../utils/authUtil.js";
import AuthService from "../services/authService.js";

const createSendToken = (user, statusCode, res) => {
  const field = {
    id: user._id
  }
	const token = jwtGenerate(field);
	const cookieOptions = {
		expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};
	if (env.NODE_ENV === "production") cookieOptions.secure = true;

	res.cookie("jwt", token, cookieOptions);

	// Remove password from output
	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

const AuthController = {
	async signup(req, res, next) {
		// console.log(req);
		try {
			const payload = req.body;
			const newUser = AuthService.createUser(payload);
			newUser.password = undefined;

			res.status(201).json({
				status: "success",
				data: {
					newUser,
				},
			});
		} catch (error) {
			console.log(error)
			return next(error);
		}
	},

	async sendEmailConfirm(req, res, next) {
		try {
			const { email } = req.body;

			if (!email) {
				return next(new AppError("Please provide email", 400));
			}

			const user = await User.findOne({ email }).select("+active");

			if (!user) {
				return next(
					new AppError("Email does not exist in the database!", 400)
				);
			}
			if (user.active) {
				return next(
					new AppError("This email was already active.", 400)
				);
			}

			// 2) Generate the random reset token
			const confirmToken = user.createEmailConfirmToken();
			await user.save({ validateBeforeSave: false });

			// 3) Send it to user's email
			const emailConfirmURL = `${req.protocol}://${req.get(
				"host"
			)}/user/activateAccount/${confirmToken}`;

			const emailContent = verificationContent(
				confirmToken
			);

			const message = `Please send a PATCH request to ${emailConfirmURL} to activate your account.`;
			try {
				await sendEmail({
					email: user.email,
					subject: "Your email confirmation token (valid for 10 min)",
					message,
					html: emailContent,
				});

				res.status(200).json({
					status: "success",
					message: "Token sent to email!",
				});
			} catch (err) {
				user.emailConfirmToken = undefined;
				user.emailConfirmExpires = undefined;
				await user.save({ validateBeforeSave: false });
				console.log(err);
				return next(
					new AppError(
						"There was an error sending the email. Try again later!"
					),
					500
				);
			}
		} catch (error) {
			console.log(error);
		}
	},

	async sendReportExcel(req, res, next) {
		const data = req.body.data;
		const email = req.body.email;
		const file_name = req.body.file_name;

		try {
			const user = await User.findOne({ email }).select("+active");

			const wb = await createExcel.createReport(data);
			const buffer = await wb.xlsx.writeBuffer();

			await sendEmail({
				email: user.email,
				subject: "Report summary",
				message: "Report summary",
				attachments: [
					{
						filename: `${file_name}.xlsx`,
						content: buffer,
						contentType:
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
					},
				],
			});
			res.status(200).json({
				status: "success",
				message: "Created Report",
			});
		} catch (err) {
			return next(new AppError("Unable to create Report"), 500);
		}
	},

	async sendFile(req, res, next) {
		const { id } = req.user;
		const { email } = await AuthService.findUser({ _id: id });
		const message = `Send PDF Attach`;
		try {
			await sendEmail({
				email: email,
				subject: "Send PDF",
				message,
				attachments: [
					{
						filename: "buffer.pdf",
						path: "./buffer.pdf",
						contentType: "application/pdf",
					},
				],
			});

			res.status(200).json({
				status: "success",
				message: "Token sent to email!",
			});
		} catch (err) {
			return next(
				new AppError(
					"There was an error sending the email. Try again later!"
				),
				500
			);
		}
	},

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			// 1) Check if email and password exist
			if (!email || !password) {
				throw new AppError("Please provide email and password!", 400);
			}
			// 2) Check if user exists && password is correct
			const user = await AuthService.findUser(
				{ email: email, active: true },
				"+password"
			);

			if (
				!user ||
				!(await user.correctPassword(password, user.password))
			) {
				throw new AppError("Incorrect email or password", 401);
			}
			createSendToken(user, 200, res);
		} catch (error) {
			return next(error);
		}

		// 3) If everything ok, send token to client
	},

	async updatePassword(req, res, next) {
		// 1) Get user from collection
		const { id } = req.user;
		const payload = req.body;
		const user = await AuthService.updatePassword(id, payload);
		createSendToken(user, 200, res);
	},

	async forgotPassword(req, res, next) {
		// 1) Get user based on POSTed email
		const user = await AuthService.findUser({
			email: req.body.email,
			active: true,
		});

		// 2) Generate the random reset token
		const resetToken = user.createPasswordResetToken();
		await user.save({ validateBeforeSave: false });

		// 3) Send it to user's email
		const resetURL = `${req.protocol}://${req.get(
			"host"
		)}/user/resetPassword/${resetToken}`;

		const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

		try {
			await sendEmail({
				email: user.email,
				subject: "Your password reset token (valid for 10 min)",
				message,
			});

			res.status(200).json({
				status: "success",
				message: "Token sent to email!",
			});
		} catch (err) {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save({ validateBeforeSave: false });

			return next(
				new AppError(
					"There was an error sending the email. Try again later!"
				),
				500
			);
		}
	},

	async resetPassword(req, res, next) {
		// 1) Get user based on the token
		const { token } = req.params;
		const { password, confirmPassword } = req.body;
		try {
			const hashedToken = hashUtil("sha256", token);
			const query = {
				active: true,
				passwordResetToken: hashedToken,
				passwordResetExpires: { $gt: Date.now() },
			};
			const payload = {
				password: password,
				confirmPassword: confirmPassword,
				passwordResetToken: undefined,
				passwordResetExpires: undefined,
			};

			const user = await AuthService.resetPassword(query, password);
			createSendToken(user, 200, res);
		} catch (error) {
			next(error);
		}

		// 2) If token has not expired, and there is user, set the new password

		// 3) Update changedPasswordAt property for the user
		// 4) Log the user in, send JWT
	},

	async activateAccount(req, res, next) {
		try {
			const { token } = req.params;
			const hashedToken =  await hashUtil("sha256", token);
			console.log(hashedToken)
			// console.log(req.params.token, hashedToken);
			const user = await AuthService.activateUser({
				active: false,
				emailConfirmToken: hashedToken,
				emailConfirmExpires: { $gt: Date.now() },
			});

			createSendToken(user, 200, res);
		} catch (error) {
			next(error);
		}
	},

	async getUserInfo(req, res, next) {
		try {
			const user = await AuthService.findUser({ _id: req.user.id });
			if (!user) {
				throw new AppError("User not found", 404);
			}
			return res.status(200).json({
				status: "success",
				data: {
					user,
				},
			});
		} catch (error) {
			return next(error);
		}
	},
};

export default AuthController;
