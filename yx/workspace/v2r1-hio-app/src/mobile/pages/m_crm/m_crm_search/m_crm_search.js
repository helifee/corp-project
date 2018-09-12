// import r from "@main/utils/xhr.js"
let s = {
    getResult (val) {
        let rs = []
        for (let i = 0; i < 20; i++) {
            rs.push({
            title: `${val} result: ${i + 1} `,
            other: i
            })
        }
        return rs
    } ,
    search (val,type){
        
    }
}
export default s;