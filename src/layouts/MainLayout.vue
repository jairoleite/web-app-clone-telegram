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

        <q-item
          v-for="(menu, index) in userMenuData"
          :key="index"
          clickable
          :active="menu.active"
          active-class="active-menu"
          @click="clickSelectUser"
        >
          <q-item-section avatar>
            <img :src="menu.image" class="user-image" />
            <div v-show="menu.online" class="online"></div>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-white"> {{ menu.name }}</q-item-label>
            <q-item-label class="text-warning" caption>
              <!-- {{ caption }} -->
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//services
import { connect, disconnect } from "src/services/socket";
//quasar
import { LocalStorage } from "quasar";
//eventlistenner
import GlobalEvent from "js-events-listener";
//proxy
import { requisicao } from "src/services/proxy";

export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: true,
      userMenuData: [],
      searchClear: false,
      eventGlobalUserList: null,
    };
  },
  methods: {
    initUser() {
      let user = this.getUserLogger();
      connect(user.uuid, user.name);
    },
    async loadUser() {
      await requisicao({ method: "GET", url: "/users" }).then((resp) => {
        this.userMenuData = resp.data.map((m) => {
          m.active = false;
          if (m.uuid === this.getUserSelected()) {
            m.active = true;
          }
          return m;
        });
      });
    },
    disconnectUser() {
      let user = this.getUserLogger();
      disconnect(user.uuid);
    },

    getUserLogger() {
      let userName = LocalStorage.getItem(`@logger`);
      return LocalStorage.getItem(`@${userName}`);
    },

    getUserSelected() {
      return LocalStorage.getItem("@selected");
    },

    clickSelectUser(uuid) {
      LocalStorage.set("@selected", uuid);
    },
  },
  created() {
    this.initUser();
    this.loadUser();

    //recebe evento global da listagem usuário
    this.eventGlobalUserList = GlobalEvent.on("event-userList", (data) => {
      data.forEach((eventUser) => {
        eventUser.active = false;
        // se existir item no array
        if (
          this.userMenuData.filter((u) => u.uuid === eventUser.uuid).length > 0
        ) {
          this.userMenuData.map((u) => {
            if (u.uuid === eventUser.uuid) {
              u.online = eventUser.online;
            }
            return u;
          });
        }
        //senão existir simplesmente adiciona
        else {
          this.userMenuData.push(eventUser);
        }
      });
    });
  },
  beforeDestroy() {
    this.disconnectUser();
    GlobalEvent.rm(this.eventGlobalUserList);
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

.user-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.online {
  position: absolute;
  margin: 53px 0px 0px 53px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #3f96d0;
}
</style>


