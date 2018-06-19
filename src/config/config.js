const isDev = process.env.NODE_ENV === "development"
const config = function () {
    if (isDev) {
        return {
            baseURL: "http://192.168.9.36:8081"
        }
    } else {
        return {
            baseURL: "http://127.0.0.1:8001"
        }
    }
}()

export default config