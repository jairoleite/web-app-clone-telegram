<template>
  <q-page class="flex column">
    <!--mensagens-->
    <div style="container-message">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 85vh; width: 100%"
        ref="scrollAreaRef"
      >
        <q-chat-message
          class="q-mx-lg q-my-lg"
          text-color="white"
          v-for="(message, index) in messageData"
          :key="index"
          :sent="!message.send"
          :bg-color="message.send ? 'accent' : 'dark'"
        >
          <template v-slot:stamp
            ><span>
              {{ message.date }}
              <b
                ><q-icon
                  style="color: #83c0eb"
                  name="done_all"
                  size="20px" /></b
            ></span>
          </template>
          <template v-slot:avatar>
            <img
              class="q-message-avatar q-message-avatar--sent q-mr-md"
              :src="message.image"
            />
          </template>

          <div>
            <span class="text-white">{{ message.text }}</span>
          </div>
        </q-chat-message>
      </q-scroll-area>
    </div>
    <!--fim-->

    <!-- parte em que é enviado as mensagens -->
    <tool-message class="tool-message" />
    <!-- fim -->
  </q-page>
</template>

<script>
//components
import ToolMessage from "src/components/ToolMessage.vue";
//proxy
import { requisicao } from "src/services/proxy";
//quasar
import { SessionStorage } from "quasar";
//eventlistenner
import GlobalEvent from "js-events-listener";

export default {
  name: "PageCentral",
  components: { ToolMessage },
  data() {
    return {
      messageData: [],
      eventGlobalMessageList: null,
      eventGlobalLoadMessage: null,
      thumbStyle: {
        right: "3px",
        borderRadius: "5px",
        backgroundColor: "#6c7883",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#6c7883",
        width: "7px",
        opacity: 0.2,
      },
    };
  },
  methods: {
    async loadMessage() {
      await requisicao({
        method: "GET",
        url: `/messages/${this.getUser().uuid}/${this.getUserSelected().uuid}`,
      }).then((resp) => {
        this.messageData = resp.data.map((m) => {
          m.send = m.userUuid === this.getUser().uuid ? true : false;
          return m;
        });
      });
      // deixa o scroll em baixo
      this.$refs.scrollAreaRef.setScrollPosition("vertical", 10000, 300);
    },
    getUser() {
      let userName = SessionStorage.getItem(`@logger`);
      return SessionStorage.getItem(`@${userName}`);
    },
    getUserSelected() {
      return SessionStorage.getItem("@selected-user") || null;
    },
  },
  created() {
    this.loadMessage();
    //atualiza lista de mensagens
    this.eventGlobalMessageList = GlobalEvent.on("event-messageList", () => {
      console.log("recebeu mensagem");
      this.loadMessage();
    });

    //atualiza lista de mensagem para o mesmo usuário
    this.eventGlobalLoadMessage = GlobalEvent.on("event-load-message", () => {
      console.log("envio mensagem");
      this.loadMessage();
    });
  },
  beforeDestroy() {
    GlobalEvent.rm(this.eventGlobalMessageList);
    GlobalEvent.rm(this.eventGlobalLoadMessage);
  },
};
</script>

<style scoped>
.tool-message {
  position: absolute;
  bottom: 0;
}
</style>
