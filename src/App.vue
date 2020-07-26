<template>

  <div id="app">
    <h2>firebaseData</h2>
    {{firebaseData}}
    <h2>form Data</h2>
    {{formData}}

      <div v-if='state==="synched"'>
        form is synched with firestore
      </div>
      <div v-else-if='state==="modified"'>
        form is not synched with firestore
      </div>
      <div v-else-if='state==="error"'>
        failed to save
      </div>
      <div v-else-if='state==="loading"'>
        loading...
      </div>

    <form @submit.prevent="updateFirebase" @input='fieldUpdate'>
      <input type="text" v-model='formData.name'>
      <input type="email" v-model='formData.email'>
      <input type="tel" v-model='formData.phone'>
      
      <button type="submit">submit</button>
    </form>
    <button @click='revertToOriginal'>revert</button>
  </div>
</template>

<script>
import {db} from './firebase';
import debounce from 'debounce';
const documentPath='contacts/jeff';

export default {
  name: 'App',
  data(){
    return{
      firebaseData:null,
      formData:{},
      state:'loading',
      originalData:null
    };
  },

  firestore(){
    return{
      firebaseData:db.doc(documentPath),
    }
  },
  methods:{
    async updateFirebase(){
      try{
        await db.doc(documentPath).set(this.formData);
        this.state='synched';
      }catch(error){
        this.errorMessage = JSON.stringify(error);
        this.state='error';
      }
    },
    fieldUpdate(){
      this.state='modified';
      this.debounceUpdate()
    },
    debounceUpdate:debounce(function(){
      this.updateFirebase();
    },3000),
    revertToOriginal(){
      this.state='revoked';
      this.formData={...this.originalData}
    }
  },
  created:async function(){
    const docRef = db.doc(documentPath);

    let data=(await docRef.get()).data();

    if(!data){
      data={name:'',phone:'',email:''};
      this.state='modified'
    }
    this.formData=data;
    this.originalData={...data};
    this.state='synced'
  
  }
}
</script>

<style>

</style>