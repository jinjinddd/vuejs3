<template >
<div class="todolist">
      <div 
      v-for=" (item, index) in items" 
      :key="item.id"
      class="item card mt-3"
      >
      <div class="text">
      <slot  :item="item" :index="index"></slot>
      </div>
      </div>
</div>
</template>

<script>
export default {
    props: {
        items:{
            type: Array,
            required : true
        }
    }

}
</script>

<style  lang="scss" scoped>
#todolist {
  margin: 30px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.item {
      background: white;
      width: 500px;
      margin: 5px;
      padding: 15px 20px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      flex-basis: fit-content;
      // https://getcssscan.com/css-box-shadow-examples
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .text{
      font-size: 20px;
      font-weight: 700;
      text-align: left;
      flex-grow: 1;
      flex-basis: fit-context;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -3px;
}

</style>