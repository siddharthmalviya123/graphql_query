 import { ApolloServer } from "@apollo/server";
 import { startStandaloneServer } from "@apollo/server/standalone";
import db from './_db.js'
 //types
import { typeDefs } from "./schema.js";
 //server setup

const resolvers ={
    Query :{
        games(){
            return db.games 
        },
        game(_,args)
        {
            args.id
            return db.games.find((review)=>review.id===args.id) 
        },
        reviews()
        {
            return db.reviews
        },
       
        review(_,args)
        {
            args.id
            return db.reviews.find((review)=>review.id===args.id) 
        }
       ,
        authors()
        {
            return db.authors
        },
        author(_,args)
        {
            args.id
            return db.authors.find((review)=>review.id===args.id) 
        }
    },
    Game :{
        reviews(parent){
            return db.reviews.filter((r)=> r.game_id===parent.id)
        }
    },
    Author :{
        reviews(parent){
            return db.reviews.filter((r)=> r.author_id===parent.id)
        }
    },
    Review:{
        author(parent){
            return db.authors.find((a)=>a.id===parent.author_id)
        },
        game(parent)
        {
            return db.games.find((g)=>g.id===parent.game_id)
        }
    },
    Mutation :{
        deleteGame(_ ,args){
            db.games= db.games.filter((g)=> g.id != args.id)
            return db.games;
        },
        addGame(_,args){
            let game ={
                ...args.game,
                id:Math.floor(Math.random()*10000).toString()
            }
            db.games.push(game);
            return game;
        },

        updateGame(_,args){
            db.games= db.games.map((g)=>{
                if((g.id)===args.id){
                    //override the edits
                    return {...g,...args.edits}
                }
                return g;
            })
            return db.games.find((g)=>g.id===args.id);
        }
    }

}

 const server= new ApolloServer({

    //typeDefs -- definition of types of data author 
    typeDefs,

    //resolvers prop
    resolvers
})

 const {url}= await startStandaloneServer(server, {
    listen:{port:4000}
 })

 console.log("server ready", 4000);