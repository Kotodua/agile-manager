/**
 * Created by k.allakhvierdov on 12/12/2014.
 */
function Verifier(){
    this.string;
}


Verifier.prototype.verifyName = function(string){

}

Verifier.prototype.verifyEmail = function(string){
    var atPos = string.indexOf('@');
    var dotPos = string.lastIndexOf('.');
    if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= string.length){
        console.log('wrong email');
        return false;
    } else {
        return true;
    }
}

Verifier.prototype.verifyPName = function(string){
    if (string.length < 3  || !isNaN(parseFloat(string)) || isFinite(string) || string.match(/\d+/g) != null){
        console.log('wrong pname');
        return false;
    } else {
        return true;
    }
}

Verifier.prototype.verify = function(string, type){
    this.string = string;

    switch(type){
        case 'email':
            if(this.verifyEmail(this.string)){return true; break}
                return false;
                break;
        case 'name':
            if(this.verifyName(this.string)){return true; break};
                return false;
                break;
        case 'phone':
            if(this.verifyPhone(this.string)){return true; break};
                return false;
                break;
        case 'pname':
            if(this.verifyPName(this.string)){return true; break};
                return false;
                break;
        default :
            console.log('Unknown string type.');
            return false;
    }
}


