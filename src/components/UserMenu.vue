<template>
  <q-item clickable>
    <q-item-section avatar>
      <img :src="image" class="user-image" />
      <div v-show="online" class="online"></div>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-white"> {{ name }}</q-item-label>
      <q-item-label class="text-warning" caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "UserMenu",
  props: {
    name: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    image: {
      type: String,
      default: "",
    },

    online: {
      type: Boolean,
      default: "",
    },
  },
};
</script>

<style scoped>
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
