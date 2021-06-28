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

}

export const loadUser = (uuid, name) => {
    let data = {
        uuid: uuid,
        name: name,
        image: 'https://cdn.quasar.dev/img/boy-avatar.png',
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

export const sendMessage = ({ uuid, user, message }) => {

    let data = {
        uuid: uuid,
        name: user,
        message: message
    }

    socket.emit('SEND_MESSAGE', data)
}