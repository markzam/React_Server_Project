import DUMMY_USERS from '../dummySift/dummyUsers.js';

const date = new Date();
//const currentMonth = date.getMonth();

//date.setMonth(currentMonth - 3);

const dummySifts = [
    {
      sift: "Sift Number 1",
      id: 1,
      postedBy: DUMMY_USERS[1].id,
      postedAt: date,
      revision: 0,
      revDate: new Date(),
    },
    {
      sift: "Sift Number 2",
      id: 2,
      postedBy: DUMMY_USERS[1].id,
      postedAt: date,
      revision: 0,
      revDate: new Date(),
    },
 
    {
      sift: "Sift number 3",
      id: 3,
      postedBy: DUMMY_USERS[2].id,
      postedAt: date,
      revision: 0,
      revDate: new Date(),
    },
     
    {
      sift: "Sift mumbo 4",
      id: 4,
      postedBy: DUMMY_USERS[0].id,
      postedAt: date,
      revision: 0,
      revDate: new Date(),
    },

    
    ];

    export default dummySifts;