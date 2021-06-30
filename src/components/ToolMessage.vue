<template>
  <div class="container-tool">
    <q-btn
      flat
      dense
      padding="md"
      size="20px"
      text-color="white"
      round
      icon="attach_file"
    />
    <input
      type="text"
      ref="message"
      v-model="message"
      placeholder="Escrever uma mensagem"
    />
    <q-btn
      id="emojis"
      dense
      padding="md"
      flat
      size="20px"
      text-color="white"
      round
      icon="sentiment_satisfied_alt"
    >
      <q-menu class="bg-primary">
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <emoji @addEmoji="addEmojiChildren($event)" />
          </div>
        </div>
      </q-menu>
    </q-btn>
    <q-btn
      class="q-mr-sm"
      padding="md"
      v-model="message"
      flat
      dense
      size="20px"
      color="info"
      round
      icon="send"
      @click="clickSendMessage"
    />
  </div>
</template>

<script>
//components
import Emoji from "src/components/emoji/Emojis.vue";
//socket
import { sendMessage } from "src/services/socket";
//evento global
import GlobalEvent from "js-events-listener";

export default {
  name: "ToolMessage",
  components: { Emoji },
  data() {
    return {
      message: "",
      eventGlobal: null,
      uuid: null,
    };
  },
  methods: {
    focusMessage() {
      this.$refs.message.focus();
    },
    addEmojiChildren(emoji) {
      this.message += emoji.emoji;
    },
    clickSendMessage() {
      if (!this.message || this.message.trim().length == 0) {
        return;
      }

      sendMessage({ uuid: this.uuid, message: this.message });
    },
  },
  mounted() {
    this.focusMessage();
  },
  created() {
    //recebe evento global de selecionar usuário
    this.eventGlobal = GlobalEvent.on("event-select-user", (data) => {
      this.uuid = data;
    });
  },
  beforeDestroy() {
    GlobalEvent.rm(this.eventGlobal);
  },
};
</script>

<style scoped>
.container-tool {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-left: 4px solid #0e1621;
  min-height: 80px;
  width: 100%;
  overflow: hidden;
  background-color: #17212b;
}

.container-tool > input {
  padding: 18px;
  color: rgb(207, 212, 216);
  outline: none;
  border: none;
  font-size: 20px;
  width: 100%;
  background-color: #17212b;
}
</style>