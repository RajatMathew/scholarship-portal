import { Initiator } from "./Initiator";
import { Scholarship } from "./Scholarship";

const scholarship = `{"id":1,"name":"IEEE Richard E Merwin Scholarship","logoImg":"https://iili.io/WpW3wg.png","description":"typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer n the industry's standard dummy text ever since the 1500s, when an unknown printer and so.","coverImg":"https://iili.io/XdAv9a.png","initiators":[1],"content":[{"title":"Eligibility","content":["Lorem Ipsum is simply dummy text of the printing and typesetting - industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer","Lorem Ipsum is simply dum}my text of the printing and typesetting - industry. Lorem Ipsum has been","Lorem Ipsum is simply dum"]},{"title":"Advantages of this program","content":["Lorem Ipsum is simply dummy text of the printing and typesetting - industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer","Lorem Ipsum is simply dum}my text of the printing and typesetting - industry. Lorem Ipsum has been","Lorem Ipsum is simply dum"]}],"timeline":[{"date":"03 MAY, 2022","title":"Registration","description":"since the 1500s, when an unknown printer n the industry's standard dummy "},{"date":"07 MAY, 2022","title":"Interview","description":"since the 1500s, when an unknown printer n the industry's standard dummy "},{"date":"25 MAY, 2022","title":"Result Announcement","description":"since the 1500s, when an unknown printer n the industry's standard dummy "}]}`;
const initiator = `{"id":1,"name":"IEEE","logo":"https://iili.io/WpVg6l.png","description":"IEEE is the world’s largest technical professional organization text ever since the 1500s, when an unknown printer n the industry's standard dummy text ever since the 1500s, when an unknown p","website":"https://ieee.org/"}`;

export function getScholarshipById(id: number) {
  return new Promise<Scholarship>((resolve, reject) => {
    setTimeout(() => {
      id === 1 ? resolve(JSON.parse(scholarship) as Scholarship) : reject();
    }, 10000);
  });
}

export function getInitiatorById(id: number) {
  return new Promise<Initiator>((resolve, reject) => {
    setTimeout(() => {
      id === 1 ? resolve(JSON.parse(initiator) as Initiator) : reject();
    }, 1000);
  });
}
