import one from "../sounds/1.mp3"
import two from "../sounds/2.mp3"
import three from "../sounds/3.mp3"
import four from "../sounds/4.mp3"
import five from "../sounds/5.mp3"
import six from "../sounds/6.mp3"
import seven from "../sounds/7.mp3"
import eight from "../sounds/8.mp3"
import nine from "../sounds/9.mp3"
import ten from "../sounds/10.mp3"
import PDRE from "../sounds/PDRE.mp3"
import BOP from "../sounds/BOP.mp3"
import Bridge from "../sounds/Bridge.mp3"
import Crown from "../sounds/Crown.mp3"
import FUR from "../sounds/FUR.mp3"
import Implant from "../sounds/Implant.mp3"
import MGJ from "../sounds/MGJ.mp3"
import Missing from "../sounds/Missing.mp3"
import MO from "../sounds/MO.mp3"
import PD from "../sounds/PD.mp3"
import RE from "../sounds/RE.mp3"
import SUP from "../sounds/SUP.mp3"
import Undo from "../sounds/Undo.mp3"
import Buccal from "../sounds/Buccal.mp3"
import Lingual from "../sounds/Lingual.mp3"
import Distal from "../sounds/Distal.mp3"
import Mesial from "../sounds/Mesial.mp3"

const voiceFeedbackHandler = async (data, volume = 0.2, loop = false) => {
  // for(let i = 0 ;i < 2; i++){
  //   let name = "1"
  //   let audio_file
  //   switch(name){
  //     case "1" : audio_file = one; break
  //     case "2" : audio_file = two; break
  //     case "3" : audio_file = three; break
  //     case "4" : audio_file = four; break
  //     case "5" : audio_file = five; break
  //     case "6" : audio_file = six; break
  //     case "7" : audio_file = seven; break
  //     case "8" : audio_file = eight; break
  //     case "9" : audio_file = nine; break
  //     case "10" : audio_file = ten; break
  //     case "PDRE" : audio_file = PDRE; break
  //     case "PD" : audio_file = PD; break
  //     case "RE" : audio_file = RE; break
  //     case "BOP" : audio_file = BOP; break
  //     case "SUP" : audio_file = SUP; break
  //     case "FUR" : audio_file = FUR; break
  //     case "MGJ" : audio_file = MGJ; break
  //     case "MO" : audio_file = MO; break
  //     case "Missing" : audio_file = Missing; break
  //     case "Crown" : audio_file = Crown; break
  //     case "Implant" : audio_file = Implant; break
  //     case "Bridge" : audio_file = Bridge; break
  //     case "Undo" : audio_file = Undo; break
  //   }
  //   let audio = new Audio(audio_file)
  //   console.log("pass here")

  //   audio.volumn = volume
  //   audio.loop = loop
  //   // 
  //   await audio.play()
  //   await new Promise(r => setTimeout(r, audio.duration*1000));
  //   // setInterval(playAudio(audio,volume,loop),5000)
  // }
  
  let { q, i, side, mode, position, target,undo_mode,i2,q2 } = data;
  let spec_id = []
  switch(q){
    case 1 : spec_id = ["distal","buccal","mesial"];break
    case 2 : spec_id = ["mesial","buccal","distal"];break
    case 3 : spec_id = ["mesial","lingual","distal"];break
    case 4 : spec_id = ["distal","lingual","mesial"];break
  }
  let audio_path_list = [];
  let audio_list = [];
  console.log(data)
  let run = false
  if(["BOP","SUP"].includes(mode)){
    for(let i = 0;i < target.length ;i++){
      if(target[i]){
        run = true
      }
    }
  }else{
    run = target? true:false
  }
  if(["PDRE","PD","RE"].includes(mode)){
    return
  }
  if (run) {
    audio_path_list.push(String(mode));
    if(undo_mode){
      audio_path_list.push(String(undo_mode))
    }
    if (side) {
      audio_path_list.push(String(side));
    }
    audio_path_list.push(String(q));
    audio_path_list.push(String(i));
    if(q2 && i2){
      audio_path_list.push(String(q2));
      audio_path_list.push(String(i2));
    }
    if (position) {
      audio_path_list.push(String(position));
    }
    if (target) {
      if(Array.isArray(target)){
        for(let i = 0;i < target.length;i++){
          if(target[i]){
            audio_path_list.push(String(spec_id[i]))
          }
        }
      }
      else{
        audio_path_list.push(String(target));
      }
    }

    console.log("path",audio_path_list)
    for (let i = 0; i < audio_path_list.length; i++) {
      let name = audio_path_list[i]
      let audio_file
      switch(name){
        case "1" : audio_file = one; break
        case "2" : audio_file = two; break
        case "3" : audio_file = three; break
        case "4" : audio_file = four; break
        case "5" : audio_file = five; break
        case "6" : audio_file = six; break
        case "7" : audio_file = seven; break
        case "8" : audio_file = eight; break
        case "9" : audio_file = nine; break
        case "10" : audio_file = ten; break
        case "PDRE" : audio_file = PDRE; break
        case "PD" : audio_file = PD; break
        case "RE" : audio_file = RE; break
        case "BOP" : audio_file = BOP; break
        case "SUP" : audio_file = SUP; break
        case "FUR" : audio_file = FUR; break
        case "MGJ" : audio_file = MGJ; break
        case "MO" : audio_file = MO; break
        case "Missing" : audio_file = Missing; break
        case "Crown" : audio_file = Crown; break
        case "Implant" : audio_file = Implant; break
        case "Bridge" : audio_file = Bridge; break
        case "Undo" : audio_file = Undo;break
        case "buccal" : audio_file = Buccal; break
        case "lingual" : audio_file = Lingual; break
        case "distal" : audio_file = Distal; break
        case "mesial" : audio_file = Mesial; break
      }
      let audio = new Audio(audio_file);
      audio_list.push(audio);
    }

    for (let i = 0; i < audio_list.length; i++) {
      audio_list[i].volume = volume;
      audio_list[i].loop = loop;
      await audio_list[i].play();
      await new Promise(r => setTimeout(r, audio_list[i].duration*1000));
    }
  }
};

// /**
//  * @returns {Audio}
//  * @param {String} name 
//  */
// const audioMap = async (name) => {
//   switch(name){
//     case "1" : audio_file = one
//     case "2" : audio_file = two
//     case "3" : audio_file = three
//     case "4" : audio_file = four
//     case "5" : audio_file = five
//     case "6" : audio_file = six
//     case "7" : audio_file = seven
//     case "8" : audio_file = eight
//     case "9" : audio_file = nine
//     case "10" : audio_file = ten
//     case "PDRE" : audio_file = PDRE
//     case "PD" : audio_file = PD
//     case "RE" : audio_file = RE
//     case "BOP" : audio_file = BOP
//     case "SUP" : audio_file = SUP
//     case "FUR" : audio_file = FUR
//     case "MGJ" : audio_file = MGJ
//     case "MO" : audio_file = MO
//     case "Missing" : audio_file = Missing
//     case "Crown" : audio_file = Crown
//     case "Implant" : audio_file = Implant
//     case "Bridge" : audio_file = Bridge
//     case "Undo" : audio_file = Undo
//   }
    
  
// }


export default voiceFeedbackHandler;
