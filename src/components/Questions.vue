<template>
    <div class="questions text-center h-100 d-flex align-items-center">
        <div class="container pt-4 pb-4">
            <h1 class="mb-3" v-if="questions[current.index]">{{questions[current.index].title}}</h1>
            <form @submit="checkForm">
                <div v-if="errors.length" class="alert alert-danger text-left" role="alert">        
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="row form-group">
                    <div class="col col-12 col-sm-6" v-for="option in current.options" v-bind:key="option.id">                    
                        <input type="checkbox" :value="option.id" :id="option.id" v-model="current.answers" hidden>
                        <label class="btn btn-outline-primary btn-block" :for="option.id">{{ option.title }}</label>
                    </div>
                </div>

                <div class="col">
                    <div class="d-flex row mb-4 progress">
                        <div class="col btn border" v-for="n in questions.length" v-bind:key="n" v-bind:class="{ 'btn-primary': n == current.index + 1, 'btn-secondary': n < current.index + 1 }"></div>
                    </div>  
                </div>

                <input class="btn btn-primary" type="submit" :value="nextTxt">  
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'Questions',
    props: ['name', 'test'],
    data: function() {
        return {
            nextTxt: 'Next',
            questions: [],
            current: {
                index: 0,
                options: [],
                answers: [],
            },
            answers: [],
            errors:[],
        }
    },
    mounted() {
        if(!this.test) {
            this.$router.push({ name: 'home'});
        } else {
            axios.get("https://printful.com/test-quiz.php", {
                params: {
                    action: 'questions', 
                    quizId: this.test,
                }
            }).then(response => {
                this.questions = response.data;
                this.getAnswers();
            });
        }
    },
    methods: {
        getAnswers() {
            axios.get("https://printful.com/test-quiz.php", {
            params: {
                action: 'answers', 
                quizId: this.test,
                questionId: this.questions[this.current.index].id,
            }
        }).then(response => {
                this.current.options = response.data;
            });
        },
        checkForm: function (e) {
            this.errors = [];
            if (this.current.answers.length > 0) {
                this.next();
            } else {
                this.errors.push('At least one option should be selected!');
            }

            e.preventDefault();
        },
        next: function () {
            var answerString = ''; // Required, cause weird api structure for response processing (processes string of ids not array) for single question
            for(var i=0; i<this.current.answers.length; i++){
                if(i == 0) {
                    answerString += this.current.answers[i];
                } else {
                    answerString += ',' + this.current.answers[i];
                }
            }

            this.answers[this.current.index] = answerString;
            this.current.answers = [];
            this.current.index += 1;

            if(this.current.index == this.questions.length - 1) {
                this.nextTxt = 'Finish';
            }
            
            if(this.current.index == this.questions.length) {
                axios.get("https://printful.com/test-quiz.php", {
                    params: {
                        action: 'submit', 
                        quizId: this.test,
                        answers: this.answers,
                    }
                }).then(response => {
                    this.$router.push({ name: 'results', params: { name: this.name, results: response.data } })
                });
            } else {
                this.getAnswers();
            }
        }
    },
}

</script>
<style>
    .btn {cursor: pointer;}
    input:checked + .btn.btn-outline-primary {
        background-color: #007bff;
        color: #fff;
    }
    .progress .btn {
        padding: 0;
    }
</style>
