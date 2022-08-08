new Vue({
    el: "#app",
    data:{
        player_health : 100,
        enemy_health : 100,
        game_is_on : false,
        attack_multiple:10,
        special_attack_multiple:40,
        heal_up_multiple:70,
        enemy_attack_multiple:20,
        log_text:{
            attack: "PLAYER ATTACKS: ",
            special_attack: "PLAYER SPECIAL ATTACKS: ", 
            enemy_attack: "ENEMY ATTACKS : " ,
            heal_up: "PLAYER HEALS : " ,
            give_up: "PLAYER RAN AWAY"
        },
        logs : []
    },
    methods:{
        start_game: function(){
            this.game_is_on = true;

        },

        player_attack: function () {
            let point= Math.ceil(Math.random()*this.attack_multiple);
            this.enemy_health-= point;
            this.add_to_log({ turn : "p" , text : this.log_text.attack+point});
            this.enemy_attack();
            
            
        },

        player_special_attack: function () {
            let point= Math.ceil(Math.random()*this.special_attack_multiple);
            this.enemy_health-= point;
            this.add_to_log({ turn : "p" , text :this.log_text.special_attack+ point});
            this.enemy_attack();
            
        },

        heal_up: function () {
            let point= Math.ceil(Math.random()*this.heal_up_multiple);
            this.player_health+= point;
            this.add_to_log({ turn : "p" , text : this.log_text.heal_up+ point});
            this.enemy_attack();
            
        },

        surrender: function () {
            
            if(confirm("You ran away.. Wanna try again?")){
                this.add_to_log({ turn : "p" , text : this.log_text.give_up });
                this.player_health=100;
                this.enemy_health=100;
                this.logs=[]
            }
             
        },  
        
        enemy_attack: function(){
            let point = Math.ceil(Math.random()*this.enemy_attack_multiple);
            this.player_health-=point;
            this.add_to_log({ turn : "e" , text : this.log_text.enemy_attack+ point});
        },

        add_to_log: function (log) {
            this.logs.push(log)
        }

    },
    watch: {
        player_health: function (value) {
            if(value<=0){
                this.player_health = 0 ;
                if(confirm("You died... Continue?")){
                    this.player_health=100;
                    this.enemy_health=100;
                    this.logs=[]
                }
            }
            else if(value >= 100){
                this.player_health=100;
            }
        },

        enemy_health: function (value) {
            if(value<0){this.enemy_health = 0 ;
                if(confirm("You won! Are you ready for another battle?")){
                    this.player_health=100;
                    this.enemy_health=100;
                    this.logs=[]
                }}
        }
    },

    computed:{
        player_progress: function () {
            return{
                width: this.player_health+ "%"
            }   
        },  

        enemy_progress: function () {
            return{
                width: this.enemy_health+ "%"
            }
        }
    }
})
