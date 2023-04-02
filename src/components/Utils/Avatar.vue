<template>
    <div>
        <img :src="imageUrl" alt="User Avatar">
    </div>
</template>

<script>

    export default {
        data() {
            return {
                username: 'user1',
                imageUrl: ''
            }
        },
        created() {
            this.imageUrl = 'https://robohash.org/' + this.$store.state.username + '.png';
            // axios.get('https://robohash.org/${this.username}.png').then(response => {
            //     this.imageUrl = response.data;
            //     console.log(this.imageUrl);
            // }).catch(error => {
            //     console.error(error);
            // });
        }
    }
</script>