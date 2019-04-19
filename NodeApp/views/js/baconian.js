function bacon123() {

var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var	baconbet = ["aaaaa","aaaab","aaaba","aaabb","aabaa","aabab","aabba","aabbb","abaaa","abaab","ababa","ababb","abbaa","abbab","abbba","abbbb","baaaa","baaab","baaba","baabb","babaa","babab","babba","babbb","bbaaa","bbaab"];

var inputbox = document.getElementById("MessageBox").value.toLowerCase();
var results = "";
for (var i = 0; i<inputbox.length; i++) {
	for  (var z = 0;z<alphabet.length; z++) {
		if (inputbox[i]==alphabet[z]) {
			results += baconbet[z];
		}
}
}
	document.getElementById("MessageBox").value = results;
}

/*
function decodebacon() {
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var	baconbet = ["aaaaa","aaaab","aaaba","aaabb","aabaa","aabab","aabba","aabbb","abaaa","abaab","ababa","ababb","abbaa","abbab","abbba","abbbb","baaaa","baaab","baaba","baabb","babaa","babab","babba","babbb","bbaaa","bbaab"];

var encrypted = document.getElementById("inputboxdecode").value.toLowerCase();
var decrypted = "";
var temp = "";
var counter;
var counter1;


for (counter = 1; counter <= encrypted.length; counter++) {
	temp += encrypted.charAt(counter-1);
	if (counter % 5 == 0) {
		for (counter1 = 0; counter1 < baconbet.length; counter1++) {
			if (temp==baconbet[counter1]) {
				decrypted += alphabet[counter1];
			}
		}
	temp = "";
	}
}
document.getElementById("outputboxdecode").innerHTML = decrypted;
} */
