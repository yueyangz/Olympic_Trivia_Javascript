module.exports = function(data, io){

        var tweet = {
            twid: data['id'],
            active: false,
            author: data['user']['name'],
            avatar: data['user']['profile_image_url'],
            body: data['text'],
            date: data['created_at'],
            screenname: data['user']['screen_name']
        };

               // socket.io emits the tweet.
                io.emit('tweet', tweet);
                // console.log('TweetHandler: emit tweet');

};