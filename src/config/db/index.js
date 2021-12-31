const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://ledong0110:zyxOvPvnytMiDh0q@cluster0.digrh.mongodb.net/Dong-Dev-Blog?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect Failure!');
    }
}

module.exports = { connect };
