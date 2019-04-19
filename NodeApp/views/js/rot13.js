function rot13sc() {
  var box = document.getElementById("MessageBox").value;
  var res = [];
  for (var i = 0; i<box.length; i++) {
    if (box.charCodeAt(i)+13 > 122) res.push(String.fromCharCode(96+box.charCodeAt(i)-122+13));
    else res.push(String.fromCharCode(box.charCodeAt(i)+13));
      }
   document.getElementById("MessageBox").value = res.join("");
};
