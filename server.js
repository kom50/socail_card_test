const express = require("express"); 
const nodeHtmlToImage = require('node-html-to-image')
 
// const cors = require('cors'); 
const app = express()

app.use(express.static('public')); 
app.use('/images', express.static('images'));

// app.use(cors())  

// Generate social media card using node-html-to-image
 function dynamicGenSocialCard(req, res){
  console.log('call from Alert', req.query);

  const {title, img_url, exams} = req.query

  console.time();
  nodeHtmlToImage({
    output: './new.png',
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
        // {{#if exams.length}}
        // <p class='exams_label'>Exams:- {{exams}}</p> 
        // {{/if}}
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
  console.log('call from Alert 1', req.query);

  let {title, img_url, info} = req.query 
  // title = title.split("%20").join(" ");
  // info = info.split("%20").join(" ");
   
  const data = await nodeHtmlToImage({
    output: './image.png',
    html: `<!DOCTYPE html>
      <html lang="en">
        <style>
        .card{
          border: 1px solid blue;
          width:1200px;
          height:600px; 
          background-color: #f2f2f2;
          position:relative; 
          border-bottom:5px yellow solid;
          box-sizing: border-box; 
        }
        .title{ 
          font-size:3.5rem;
          margin: 0; 
        }
        img{ 
          width: 200px;
          height:200px;
          border-radius:50%;
           
          margin-left:auto;
        }
        .info-label{
          position:absolute;
          bottom:45px;
          font-size:2.5rem;
          padding-left:60px;
       } 
      .box{
          display: flex;
          padding:60px;
      }
      .site-name{
        background-color: blue;
        color: white;
        padding: 5px;
        text-align: center;
        font-size: 2.5rem;
        position:absolute;
        bottom:0px;
        width: 100%;
        font-weight:bold;
     }
      </style>
    </head> 
     <body class='card'> 
        <div class="box">
          <h1 class='title'>{{title}} </h1> 
          <img src='{{img_url}}'/>   
        </div>
        {{#if info.length}}
          <p class='info-label'>Exams:- {{info}}</p> 
        {{/if}}
        <div class='site-name'>alert.exampathfinder.com</div>
        </body>
    </html>`, 
    content:{title, img_url, info  }, 
  }) 
  res.set("Content-Type", "image/png");
  res.status(200)
  res.send(data)
}  

app.get('/social_card',  dynamicGenSocialCard1)

 

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})