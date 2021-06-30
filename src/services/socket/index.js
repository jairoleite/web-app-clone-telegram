import GlobalEvent from 'js-events-listener'


const serverUri = "http://127.0.0.1:9000";

let socket;

//conecta no servidor
export const connect = (uuid, name) => {
    socket = io.connect(serverUri, {
        'force new connection': true,
        'query': 'UID=' + uuid
    });

    socket.on('connect', () => {
        loadUser(uuid, name);
    })

    socket.on('USER_LIST', (data) => {
        GlobalEvent.emit('event-userList', data)
    })

    socket.on(`RECEIVE_MESSAGE-${uuid}`, (data) => {
        GlobalEvent.emit('event-messageList');
    })
}

export const loadUser = (uuid, name) => {
    let data = {
        uuid: uuid,
        name: name,
        image: name === 'Maria' ? 'https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg' : "https://icones.pro/wp-content/uploads/2021/03/avatar-de-personne-icone-homme.png",
        online: true
    }

    socket.emit('CONNECT', data)
}

export const disconnect = (uuid) => {
    let data = {
        uuid: uuid
    }

    socket.emit('DISCONNECT', data)
}

export const sendMessage = ({ uuid, userSendUuid, message }) => {

    let data = {
        text: message,
        userSendUuid: userSendUuid,
        userUuid: uuid
    }

    socket.emit('SEND_MESSAGE', data)
}