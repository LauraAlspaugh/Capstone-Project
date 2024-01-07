<template>
    <div class="container-fluid cream-bg w-100 boxHeight ps-4 m-0 moves-list">
        <MoveFilterBar />
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
.boxHeight {
    min-height: 83dvh;
}

.cream-bg {
    border: 1px solid #C4D0CC;
    background-color: #e0dddbd5;
    backdrop-filter: blur(3px)
}

.selectedLevel {
    background-color: #0F2D24;
}

.image-border {
    border: 2px solid #D7DBDB;
    background-color: #e3e0de5b;
}

.filter-height {
    height: 4.8rem;
}

.moves-list {
    overflow-y: auto;
    max-height: 70dvh;
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 2px solid transparent;
    background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
}

@media screen and (max-width<768px) {}
</style>