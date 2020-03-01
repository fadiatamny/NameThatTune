
export default class CacheHandler{
    static setCache(key,value){
        sessionStorage.setItem(key,value);
    };
    
    static verifyCache(key){
        return sessionStorage.getItem(key) !== null;
    };

    static removeCache(key){
        sessionStorage.removeItem(key);
    };

    static clearCache(){
        sessionStorage.clear();
    };
}