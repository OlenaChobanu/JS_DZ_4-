// 1. Есть блок кода, в котором три инпута и кнопка. В инпуты по очереди вводим - имя, фамилию, номер телефона.
// 2. Под блоком с инпутами, есть блок таблицы с столбцами - имя, фамилия, телефон
// 3. Клик на кнопку создает новый контакт и он должен отобразиться в таблице
// 4. Контактов может быть БОЛЬШЕ чем один, то есть если мы после первого Иван Иванов 067223344 , ввели Петя Петров 0503344556 то Пётр тоже должен появиться в таблце контактов.
// 5. Все поля обязательные для заполнения
// 6. После нажатия на кнопку - поля очищаются
// 7. Проверки желательны но не обязательны (номер телефона обычно проверяется регекспом)

const contactContainerE = document.getElementById('contact-items');
const inpNameE = document.getElementById('input-name');
const inpLastNameE = document.getElementById('input-last-name');
const inpPhoneE = document.getElementById('input-phone');

const btnE =  document.getElementById('btn');

btnE.addEventListener('click', onClick);

function onClick() {
    const name = capitalize(inpNameE.value);
    const lastName = capitalize(inpLastNameE.value);
    const phoneNumber = inpPhoneE.value;

    if(!validateString(name) || !validateString(lastName)  || !validatePhone(phoneNumber)) {
        showPopup('Please enter correct data');

        clearValue(inpNameE);
        clearValue(inpLastNameE);
        clearValue(inpPhoneE);

        inpNameE.focus();
        return;
    }

    const contact = createContact(name, lastName, phoneNumber);
    addElement(contact, contactContainerE);

    clearValue(inpNameE);
    clearValue(inpLastNameE);
    clearValue(inpPhoneE);

    inpNameE.focus();
}

function createContact(name, lastName, phoneNumber) {
    const containerE = createElement('li');
    const nameE = createElement('div');
    const lastNameE = createElement('div');
    const phoneE = createElement('div');
    
    nameE.textContent = name;
    lastNameE.textContent = lastName;
    phoneE.textContent = phoneNumber;

    addElement(nameE, containerE);
    addElement(lastNameE, containerE);
    addElement(phoneE, containerE);

    return containerE;
}

function validateString(string) {
    return string.trim();
}

function validatePhone(phoneNumber){
    const regex = /^\+?[3]?[\s\-]?[8]?[\s\-]?\(?[0][\s\-]?[5679][0356789]\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phoneNumber);
}

function capitalize (string) {
    return string.toLowerCase().replace(string.toLowerCase().slice(0,1), string.toLowerCase().slice(0,1).toUpperCase());;
}

function showPopup(message) {
    alert(message);
}

function createElement(tag) {
    return document.createElement(tag);
}

function addElement(element, containerE) {
    return containerE.append(element);
}

function clearValue(inpElement) {
    inpElement.value = '';
}