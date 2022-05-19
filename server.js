const express = require("express"); 
const nodeHtmlToImage = require('node-html-to-image')
 
var cors = require('cors'); 

const app = express()

app.use(cors())

app.use((res, req, next)=>{
  console.log('app use');
  next()
})

app.get('/', (req,res)=>{
  res.send('Home')
})


// Generate social media card using node-html-to-image
 function dynamicGenSocialCard(req, res){
  console.log('call from Alert', req.query);

  const {title, img_url, exams} = req.query

  console.time();
  nodeHtmlToImage({
    output: './new.jpg',
    html: `<html >
      <head>
        <style>
        .card{
          border: 1px solid blue;
          width:1200px;
          height:630px;
          padding: 60px;
          background-color: #f2f2f2;
          position:relative; 
          border-bottom:20px yellow solid;
          box-sizing: border-box; 
        }
        .title{ 
          font-size:4rem;
          margin: 0; 
        }
        img{ 
          width: 200px;
          height:200px;
          border-radius:50%;
          margin-left:10px;
        }
        .exams_label{
          position:absolute;
          bottom:10px;
          font-size:3rem;
       } 
      .box{
        display: flex;
      }
      </style>
    </head> 
     <body class='card'> 
        <div class="box">
          <h1 class='title'>{{title}} </h1> 
          <img src='{{logo}}'/>   
        </div>
        {{#if exams.length}}
        <p class='exams_label'>Exams:- {{exams}}</p> 
        {{/if}}
      </body>
    </html>`, 
    content:{title,  logo:img_url, exams  }, 
  })
    .then((data) => {
      console.log('The image was created successfully!')
      if(res){
        res.set("Content-Type", "image/png");
        res.send(data)
      }
      console.timeEnd()
  }).catch(err=>{
    res.json(err)
  })
}
 
async function dynamicGenSocialCard1(req, res){
  console.log('call from Alert', req.query);

  const {title, img_url, exams} = req.query

  console.time();
  const data = await nodeHtmlToImage({
    output: './new.jpg',
    html: `<html >
      <head>
        <style>
        .card{
          border: 1px solid blue;
          width:1200px;
          height:620px;
          padding: 60px;
          background-color: #f2f2f2;
          position:relative; 
          border-bottom:20px yellow solid;
          box-sizing: border-box; 
        }
        .title{ 
          font-size:4rem;
          margin: 0; 
        }
        img{ 
          width: 200px;
          height:200px;
          border-radius:50%;
          margin-left:10px;
        }
        .exams_label{
          position:absolute;
          bottom:10px;
          font-size:3rem;
       } 
      .box{
        display: flex;
      }
      </style>
    </head> 
     <body class='card'> 
        <div class="box">
          <h1 class='title'>{{title}} </h1> 
          <img src='{{logo}}'/>   
        </div>
        {{#if exams.length}}
          <p class='exams_label'>Exams:- {{exams}}</p> 
        {{/if}}
      </body>
    </html>`, 
    content:{title,  logo:img_url, exams  }, 
  })
    // .then((data) => {
  console.log('The image was created successfully!', data)

  res.set("Content-Type", "image/png");
  res.send(data) 
  console.timeEnd()
  // }).catch(err=>{
    // res.json(err)
  // })
}
 

app.get('/social_card',  dynamicGenSocialCard1)

const PORT = 5050

app.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})