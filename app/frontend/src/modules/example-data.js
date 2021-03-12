import http from '@/services/http';
import { reactive } from 'vue';
const state = reactive({
  someData: null,
  someDataIsLoading: false
});

export default function useExampleData() {
  async function loadExampleData() {
    try {
      state.someDataIsLoading = true;
      const response = await http.get('/api/example');
      state.someData = response.data;
    } catch (error) {
      throw error;
    } finally {
      state.someDataIsLoading = false;
    }
  }

  return {
    exampleData: state,
    loadExampleData
  };
}
