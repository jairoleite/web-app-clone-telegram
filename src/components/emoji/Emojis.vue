<template>
  <div class="row no-wrap container">
    <q-btn
      color="white"
      v-close-popup
      flat
      round
      v-for="(emoji, index) in emojiData"
      :key="index"
      @click="clickAddEmoji(emoji)"
    >
      <i
        :class="emoji.class"
        :aria-role="emoji.ariarole"
        :aria-label="emoji.arialabel"
      ></i>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: "Emojis",
  data() {
    return {
      emojiData: [
        {
          class: "em em---1 emoji",
          ariarole: "presentation",
          arialabel: "THUMBS UP SIGN",
          emoji: "👍",
        },
        {
          class: "em em--1 emoji",
          ariarole: "presentation",
          arialabel: "THUMBS DOWN SIGN",
          emoji: "👎",
        },
        {
          class: "em em-angel emoji",
          ariarole: "presentation",
          arialabel: "BABY ANGEL",
          emoji: "🙁",
        },
        {
          class: "em em-angry emoji",
          ariarole: "presentation",
          arialabel: "ANGRY FACE",
          emoji: "😟",
        },
        {
          class: "em em-anguished emoji",
          ariarole: "presentation",
          arialabel: "ANGUISHED FACE",
          emoji: "😟",
        },
        {
          class: "em em-astonished emoji",
          ariarole: "presentation",
          arialabel: "ASTONISHED FACE",
          emoji: "😲",
        },
      ],
    };
  },
  methods: {
    clickAddEmoji(emoji) {
      this.$emit("addEmoji", emoji);
    },
  },
};
</script>

<style scoped>
.container {
  height: 38px;
}
</style>