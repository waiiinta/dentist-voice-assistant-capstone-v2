<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kracker71/dentist-voice-assistant-capstone-v2">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Dentist Voice-Controlled Assistant V2</h3>

  <p align="center">
    Dentist Voice Assistant V2 is a web application that assist dentists in performing periodontal assessment.
    <br />
    <a href="https://www.canva.com/design/DAFzZ6wAV2Y/1AeBI10hIzopiv0iigN5hg/edit?utm_content=DAFzZ6wAV2Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"><strong>Explore the docs V2 »</strong></a>
    <a href="https://www.canva.com/design/DAFrH4iP0lg/6BK32c5DdeqhZs2YEcVszg/view?utm_content=DAFrH4iP0lg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)"><strong>Explore the docs V1 »</strong></a>
    <br />
    <br />
    <a href="https://drive.google.com/file/d/1CVUm5IdGeJvlQm6N6i1o4ZG_H2Zq00qI/view">View Demo</a>
    ·
    <a href="https://github.com/kracker71/dentist-voice-assistant-capstone-v2/issues">Report Bug</a>
    <!-- · -->
    <!-- <a href="https://github.com/kracker71/dentist-voice-assistant-capstone-v2/issues">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <!-- <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://184.169.184.84:5001)

In general, the dentists assess patients' mouth with both hands and they must remove their gloves to write down the periodontal value after appraising one tooth. The dentist's workflow is slowed as a result of this handicap. As a result, we have proposed using machine learning to mitigate the problems.
---
Dentist Voice Assistant comprises of three models: 1. Gowajee (ASR model) 2. WangChanBerta (Token Classification Model) 3. Parser Model.For the further explaination, please visit documents above.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Express][Express.js]][Express-url]
* [![WebRTC][WebRTC]][WebRTC-url]
* [![gRPC][gRPC]][gRPC-url]
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



GETTING STARTED
## Getting Started

For open manually
* [Installation Guide](https://docs.google.com/document/d/1Bret9-gSYwNU_Z3NNdwDi6Qz_OoOCxlHNF7yMsVefwM/edit?usp=sharing)

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* conda
  ```sh
  conda create -n <your-env-name> python=3.9
  ```
* npm
  ```sh
  npm install npm@latest -g
  ```
* openssl
  for Mac
  ```sh
  brew install openssl
  ```
  for Window download in [openssl website](https://www.openssl.org/)
* docker
* docker-compose

  


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kracker71/dentist-voice-assistant-capstone-v2.git
   ```
2. Create .env in backend,backend_webrtc,frontend
3. Copy .env template from .env.example
4. Enter every field in .env files
5. create your cert.pem and key.pem in backend,backend_webrtc,frontend
   ```sh
   openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
   ```
6. use Docker
    ```sh
    docker-compose up
    ```
7. If you want to open in your local not in container you can follow this [link](https://docs.google.com/document/d/1Bret9-gSYwNU_Z3NNdwDi6Qz_OoOCxlHNF7yMsVefwM/edit?usp=sharing)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- ROADMAP
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/kracker71/dentist-voice-assistant-capstone-v2/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTRIBUTING
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- LICENSE -->
<!-- ## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTACT -->
## Contact

Chayut Kritveeranat - [@twitter](https://twitter.com/ChayutKrit) - [chayutkritv@gmail.com](chayutkritv@gmail.com) - [linkedin](http://www.linkedin.com/in/chayut-au)

Project Link: [https://github.com/kracker71/dentist-voice-assistant-capstone-v2e](https://github.com/kracker71/dentist-voice-assistant-capstone-v2)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/kracker71/dentist-voice-assistant-capstone-v2.svg?style=for-the-badge
[contributors-url]: https://github.com/kracker71/dentist-voice-assistant-capstone-v2/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kracker71/dentist-voice-assistant-capstone-v2.svg?style=for-the-badge
[forks-url]: https://github.com/kracker71/dentist-voice-assistant-capstone-v2/network/members
[stars-shield]: https://img.shields.io/github/stars/kracker71/dentist-voice-assistant-capstone-v2.svg?style=for-the-badge
[stars-url]: https://github.com/kracker71/dentist-voice-assistant-capstone-v2/stargazers
[issues-shield]: https://img.shields.io/github/issues/kracker71/dentist-voice-assistant-capstone-v2.svg?style=for-the-badge
[issues-url]: https://github.com/kracker71/dentist-voice-assistant-capstone-v2/issues
[license-shield]: https://img.shields.io/github/license/kracker71/dentist-voice-assistant-capstone-v2.svg?style=for-the-badge
[license-url]: https://github.com/kracker71/dentist-voice-assistant-capstone-v2/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: http://www.linkedin.com/in/chayut-au
[product-screenshot]: images/screenshot.jpg
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Express-url]: https://expressjs.com/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[WebRTC-url]:https://webrtc.org/
[WebRTC]:https://img.shields.io/badge/WebRTC-yellow?logo=webrtc
[gRPC-url]:https://grpc.io/
[gRPC]:https://img.shields.io/badge/gRPC-blue?logo=goodreads



