const voiceFeedbackHandler = (data) => {
  let {q,i,side,mode,spec,is_finish} = data
  let audio_list = []
  if(is_finish){
    audio_list.push(String(mode))
    audio_list.push(String(side))
    audio_list.push(String(q))
    audio_list.push(String(i))
    audio_list.push()
  }

}

export default voiceFeedbackHandler