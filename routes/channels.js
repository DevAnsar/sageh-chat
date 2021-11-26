var express = require('express');
var router = express.Router();

const chats=[
  {
    id : 1,
    users:[1,2],
    messages: [
      {channel_id: 1, text: "سلام پژمان", sender_userid:1, id: 1622751658210},
      {channel_id: 1, text: "شسشسیشسیشسی", sender_userid:2, id: 1622751668570},
      {channel_id: 1, text: "سلام انصار", sender_userid: 2, id: 1622751677771},
      {channel_id: 1, text: "چخبر جیگر", sender_userid: 1, id: 1622752062850}
    ]
  },
  {
    id : 2,
    users:[3,1],
  },
  {
    id : 3,
    users:[3,2],
  },
]

const users=[
  {
    id:1,
    name: "انصار",
    family:"میرزایی",
    age:'24',
    profile_img:"http://web.sageh.ir/images/2021/categories/Farming-tools/icon/farming.svg",
  },
  
  {
    id:2,
    name: "پژمان",
    family:"یزدان خواه",
    age:'24',
    profile_img:"http://web.sageh.ir/images/2021/categories/Farming-tools/icon/farming.svg",
  },
  
  {
    id:3,
    name: "مهدی",
    family:"نوری",
    age:'20',
    profile_img:"http://web.sageh.ir/images/2021/categories/Farming-tools/icon/farming.svg",
  }
];

function other_user_data(_users,my){

  let data=[];
  _users.map(user=>{
    if(user !== my){
      let user_data=users.find(u=>u.id===user)
      data.push(user_data);
    }
  });
  return data;
};
function getChannels(my_id){
  let channels=[];
  
  chats.map(chat=>{
    chat.users.map(user=>{
      if(user===my_id){
        chat.other_user_data=other_user_data(chat.users,my_id)
        channels.push(chat)
      };
    })
  });
  return channels;
}
router.get('/', function(req, res, next) {
  // my_id=req.user_id;
  const my_id=1;

  res.send({channels:getChannels(my_id)});
});

router.get('/:user_id', function(req, res, next) {
  res.send({ user_id: req.data });
});

module.exports = router;