<template>
  <!--Bootstrap Pagination-->
    <hr />
    <div class="text-center">
    <nav aria-label="Page navigation example">
        <ul  class="pagination">
          <li class="page-item"
              v-if="currentPage !== 1">
            <a 
                style="cursor: pointer" 
                class="page-link"  
                @click="onClick(currentPage - 1)">
              Previous
            </a>
          </li>
              <li 
                v-for="page in PageNumber"
                :key="page"
                class="page-item"
                :class="currentPage == page ? 'active':''">
                <a 
                    style="cursor: pointer" 
                    class="page-link" 
                    @click="onClick(page)">
                  {{page}}
                </a>
              </li>
          <li 
          v-if="PageNumber !== currentPage" 
          class="page-item">
            <a 
                style="cursor: pointer" 
                class="page-link" 
                @click="onClick(currentPage + 1)">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
export default {
    props:{
        currentPage:{
            type: Number,
            required: true
        },

        PageNumber:{
            type:Number,
            required:true
        }
    },
    emits: ['click'],
    setup(props,{emit}){
        const onClick = (page) =>{
            emit('click',page)
        }
        return{
            onClick
        }
    }

}
</script>

<style>
.pagination{
    justify-content: center;
}
</style>