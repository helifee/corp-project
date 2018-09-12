import axios from 'axios'
// const USER_ID = parseInt(Math.random() * 1000)
function generateTime() {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  const minutes = timeNow.getMinutes();
  const seconds = timeNow.getSeconds();
  let timeString = '' + hours;
  timeString += (minutes < 10 ? ':0' : ':') + minutes;
  timeString += (seconds < 10 ? ':0' : ':') + seconds;
  return timeString
}

const mockData = [
  { time: generateTime(),
    type: 'system',
    label: 'System',
    message: '欢迎来到巨洲云JSer自助服务系统' },
    // { time: generateTime(), type: 'info', label: 'Info', message: 'Terminal Initializing ............' },
    // { time: generateTime(), type: 'warning', label: 'warning', message: 'This is a Waning Message!' },
    // { time: generateTime(), type: 'error', label: 'Error', message: 'Oops, Something Went Wrong!' },
    // { time: generateTime(), type: 'success', label: 'Success', message: 'Take it easy! Everything OK!' }
]

export default {
  // echo: {
  //   description: 'Echoes input',
  //   echo(pushToList, input) {
  //     input = input.split(' ')
  //     input.splice(0, 1)
  //     const p = new Promise(resolve => {
  //       pushToList({ time: generateTime(), label: 'Echo', type: 'success', message: input.join(' ') });
  //       resolve({ type: 'success', label: '', message: '' })
  //     })
  //     return p
  //   }
  // },
  defaultTask: {
    description: 'this is default task.',
    defaultTask(pushToList) {
      let i = 0;
      const p = new Promise(resolve => {
        const interval = setInterval(() => {
          mockData[i].time = generateTime()
          pushToList(mockData[i]);
          i++
          if (!mockData[i]) {
            clearInterval(interval)
            resolve({ type: 'success',
                label: 'Success',
                message:{
                    // list:[
                    //     {label:'一键切换开发环境',message:'(命令:switch env)'}
                    // ],
                    table:[
                        {label:'一键切换开发环境',cmd:'switch env',desc:'切换成功后需重登录,F5刷新页面后恢复原本环境'}
                    ],
                    text: '系统载入成功，输入命令开启自助之旅吧^_^' }
                },
                )
          }
        }, 200);
      })
      return p
    }
  },
  open: {
    description: 'Open a specified url in a new tab.',
    open(pushToList, input) {
      const p = new Promise((resolve, reject) => {
        let url = input.split(' ')[1]
        if (!url) {
          reject({ type: 'error', label: 'Error', message: 'a url is required!' })
          return
        }
        pushToList({ type: 'success', label: 'Success', message: 'Opening' })

        if (input.split(' ')[1].indexOf('http') === -1) {
          url = 'http://' + input.split(' ')[1]
        }
        window.open(url, '_blank')
        resolve({ type: 'success', label: 'Done', message: 'Page Opened!' })
      })
      return p;
    }
  },
  chat: {
    description: 'Chat with a robot',
    chat(pushToList, input) {
      input = input.split(' ')[1]
      axios.post('url', {

      }).then(response => {
        console.log(response)
      })
      const p = new Promise((resolve, reject) => {
        const url = input.split(' ')[1]
        if (!url) {
          reject({ type: 'error', label: 'Error', message: 'a url is required!' })
          return
        }
      })
      return p;
    }
  }

}
