const voiceFeedbackHandler = async (data, volume = 0.2, loop = false) => {
  console.log("pass here")
  let { q, i, side, mode, spec_id, target } = data;
  let audio_path_list = [];
  let audio_list = [];

  if (data.is_finish) {
    audio_path_list.push(String(mode) + ".mp3");
    audio_path_list.push(String(q) + ".mp3");
    audio_path_list.push(String(i) + ".mp3");
    if (side) {
      audio_path_list.push(String(side) + ".mp3");
    }
    if (spec_id) {
      audio_path_list.push(String(spec_id) + ".mp3");
    }
    if (target) {
      audio_path_list.push(String(target) + ".mp3");
    }

    for (let i = 0; i < audio_path_list.length; i++) {
      let audio = new Audio(`../sounds/${audio_path_list[i]}`);
      audio_list.push(audio);
    }

    for (let i = 0; i < audio_list.length; i++) {
      audio_list[i].volume = volume;
      audio_list[i].loop = loop;
      await audio_list[i].play();
    }
  }
};

export default voiceFeedbackHandler;
