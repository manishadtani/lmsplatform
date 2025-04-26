const _config = {
    PORT:process.env.PORT || 3000,
    MONGO_URL:process.env.MONGO_URL || 'mongodb://localhost:27017/lmsplatformapp',
    JWT_SECRET:process.env.JWT_SECRET
}


const config = Object.freeze(_config)

export default config