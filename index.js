const express = require('express');
let app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

let methodOverride = require('method-override');


app.use(methodOverride('_method'));
let port = 8080;
app.use(express.urlencoded( { extended: true}));
app.set("view engine" , "ejs");
// app.set("views", path.join(__dirname, "views"));
app.use( express.static ( path.join (__dirname , "public")));

let posts = [

    {   id:uuidv4(),
        username:"cherry",
        content:"love coding",
    },

    {   id:uuidv4(),
        username:"karthik",
        content:"love gaming",
    },

    {       id:uuidv4(),
        username:"sam",
        content:"love biryani",
    },
]
app.listen( port , () =>{

    console.log(`listening to port ${port}`);


});

app.get("/posts" , (req , res) =>{

    res.render(  "index.ejs" , {
      posts
    });
});

app.get("/posts/new" , (req , res) => {

    res.render("new.ejs");
} );

app.post("/posts" , ( req , res) =>{


    let {username , content } = req.body;

    // console.log(req.body);

      let id = uuidv4();

       posts.push( { id,username , content });

    res.redirect("/posts");
});

app.get("/posts/:id" , (req , res) => {
          
    let {id} = req.params;
  let postss = posts.find(  (p) => id === p.id);

//    console.log(postss);

   res.render("show.ejs" , { postss});
} );

app.patch("/posts/:id" , (req , res) => {
    let {id} = req.params;

    let newcontent = req.body.content;

    let postss = posts.find(  (p) => id === p.id);

    postss.content = newcontent;

    console.log(postss);

    // console.log(id);
    // console.log(newcontent);
    res.redirect("/posts");
});

app.get("/posts/:id/edit" , ( req , res) =>{

    let {id} = req.params;
    let postss = posts.find(  (p) => id === p.id);
    console.log(id);

    res.render("edit.ejs" , { postss});
});

app.delete("/posts/:id" , ( req , res) => {
    let {id} = req.params;
     posts = posts.filter(  (p) => id !== p.id);

     res.redirect("/posts");

});