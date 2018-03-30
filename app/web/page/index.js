import '../assets/css/app.css';
import Icon from '../assets/img/logo.png';

function component() {
  var element = document.createElement('div');
  element.innerHTML = 'HEY';

  var myIcon = new Image();
	myIcon.src = Icon;
	element.appendChild(myIcon);

  return element;
}
document.body.appendChild(component());