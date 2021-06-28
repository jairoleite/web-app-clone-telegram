<template>
  <q-layout view="lHh lpR lff" class="bg-secondary">
    <q-header class="header-top">
      <q-toolbar>
        <q-toolbar-title>
          <div class="user-info">
            <span class="name">Maria</span>
            <span class="minutes text-warning">visto a 36 minutos</span>
          </div>
        </q-toolbar-title>
        <q-space />
        <div>
          <q-btn
            dense
            size="18px"
            color="warning"
            text-color="white"
            round
            flat
            icon="search"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="bg-primary">
      <q-list>
        <q-item-label
          header
          style="margin-left: -10px"
          class="row no-wrap text-grey-8"
        >
          <q-btn color="warning" round flat icon="menu" />
          <input class="left-side-find" type="text" placeholder="Buscar" />
          <q-btn
            v-if="searchClear"
            flat
            dense
            color="warning"
            round
            icon="close"
            class="btn-clean-search"
          />
        </q-item-label>

        <user-menu v-for="link in userMenu" :key="link.uuid" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//component
import UserMenu from "src/components/UserMenu.vue";
//services
import { connect, disconnect } from "src/services/socket";
//quasar
import { uid, LocalStorage } from "quasar";
//eventlistenner
import GlobalEvent from "js-events-listener";

const linksList = [
  {
    title: "Maria",
    caption: "isso ai mesmo ",
    image: "https://cdn.quasar.dev/img/avatar.png",
  },
];

export default {
  name: "MainLayout",
  components: {
    UserMenu,
  },
  data() {
    return {
      leftDrawerOpen: true,
      userMenu: [],
      searchClear: false,
      eventGlobal: null,
    };
  },
  methods: {
    loadUser() {
      let user = this.getUserLogger();
      connect(user.uuid, user.name);
    },
    disconnectUser() {
      let user = this.getUserLogger();
      disconnect(user.uuid);
    },

    getUserLogger() {
      let userName = LocalStorage.getItem(`@logger`);
      return LocalStorage.getItem(`@${userName}`);
    },
  },
  created() {
    this.loadUser();

    //recebe evento global da listagem usuário
    this.eventGlobal = GlobalEvent.on("event-userList", (data) => {
      console.log(data);
      this.userMenu = data;
    });
  },
  beforeDestroy() {
    this.disconnectUser();
    GlobalEvent.rm(this.eventGlobal);
  },
};
</script>

<style scoped>
.header-top {
  display: flex;
  justify-content: center;

  min-height: 65px;
  border-left: 4px solid #0e1621;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-info > .name {
  color: aliceblue;
}

.user-info > .minutes {
  margin: 3px 0px;
  font-size: 12px;
}

.left-side-find {
  padding: 7px 10px;

  border-radius: 5px;
  border: none;
  outline: none;
  width: 100%;
  color: aliceblue;
  background-color: #242f3d;
}

.btn-clean-search {
  position: absolute;
  right: 0;
  margin-right: 26px;
  margin-top: 5px;
}
</style>


