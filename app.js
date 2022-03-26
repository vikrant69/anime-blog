const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const { redirect } = require("express/lib/response");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const aboutYou = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const posts=[];

app.get('/',(req, res)=>{
    res.render('home',{
        aboutYou: aboutYou,
        posts: posts
    });
});

app.get('/compose', (req, res)=>{
    res.render('compose');
});

app.post('/compose', (req, res)=>{
    let post = {
        title: req.body.postTitle,
        body: req.body.postBody
    };

    posts.push(post);
    
    res.redirect('/');

});

app.get('/about', (req, res)=>{
    res.render('about');
})

app.get('/contact', (req, res)=>{
    res.render('contact');
})

app.get('/posts/:value', (req, res)=>{
    const val1 = _.lowerCase(req.params.value);
    
    for(var i=0; i<posts.length; i++){
        const val2 = _.lowerCase(posts[i].title);

        if(val1 === val2){
            console.log('match found')
            res.render('post',{
                title: posts[i].title,
                body: posts[i].body
            });
        }
    }
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});