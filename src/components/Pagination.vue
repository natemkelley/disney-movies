<template>
    <ul class="pagination right-align row">
        <li class="">
            <a href="#!" v-on:click="chevron('dec')"><i class="material-icons">chevron_left</i></a>
        </li>
        <li class="waves-effect" v-for="(count, index) in pageCount" v-on:click="clickPaginate(count)" v-bind:class="{ active: (activePage == (count)) }">
            <a href="#!">{{count}}</a>
        </li>
        <li class="waves-effect"><a href="#!" v-on:click="chevron('inc')"><i class="material-icons">chevron_right</i></a></li>
        <li class="right">
            <select class="browser-default" @change="onChange($event)">
            <option value="50" >50</option>
            <option value="100" selected="selected">100</option>
            <option value="150">150</option>
            <option value="200" >200</option>
          </select>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'Pagination',
        data() {
            return {
                searchQuery: '',
                pageNumbers: 100,
                activePage: 1,
                results: []
            }
        },
        methods: {
            clicked: function() {
                this.searchQuery = ''
                this.$emit('input', this.searchQuery);
                this.$emit('results', this.movies);
            },
            clickPaginate(clickedNum) {
                if (!clickedNum) {
                    clickedNum = 1
                }
                this.activePage = clickedNum
            },
            onChange(event) {
                this.pageNumbers = event.target.value
            },
            chevron(incdec) {
                if (incdec == 'inc') {
                    if (this.activePage + 1 <= this.pageCount.length) {
                        this.clickPaginate(this.activePage + 1)
                    } else {
                        this.clickPaginate(1)
                    }
                } else {
                    if (this.activePage - 1 > 0) {
                        this.clickPaginate(this.activePage - 1)
                    } else {
                        this.clickPaginate(this.pageCount.length)
                    }
                }
            }
        },
        props: {
            movies: Array,
            filteredMovies: Array
        },
        computed: {
            pageCount() {
                var arr = []
                if (this.filteredMovies) {
                    let l = Math.ceil(this.filteredMovies.length / this.pageNumbers);
                    for (var i = 1; i <= l; i++) {
                        arr.push(i)
                    }
                } else {
                    let l = Math.ceil(this.movies.length / this.pageNumbers);
                    for (var i = 1; i <= l; i++) {
                        arr.push(i)
                    }
                }
                return arr
            },
            filteredItems() {
                let start = ((this.activePage - 1) * this.pageNumbers);
                let end = Number(start) + Number(this.pageNumbers);
                return ({
                    start: start,
                    end: end
                })
            }
        },
        updated() {
            this.$emit('pagresults', this.filteredItems);
        }
    }

</script>

<style scoped>
    select {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 5px;
        height: 2.4rem;
    }

    .pagination li.active {
        background-color: #3d9d41;
    }

    @media only screen and (max-width: 494px) {
        .pagination {
            text-align: left!important;
        }
    }

</style>
