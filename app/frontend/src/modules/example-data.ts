import http from '@/services/http';
import { reactive } from 'vue';

interface ExampleDataModule {
  exampleData: ExampleDataState;
  loadExampleData(): Promise<void>;
}

interface ExampleDataState {
  someData: SomeData | null;
  someDataIsLoading: boolean;
}

interface SomeData {
  color: string;
  foobar: string;
  miles: number;
  thing: string;
}

const state: ExampleDataState = reactive({
  someData: null,
  someDataIsLoading: false
});

function useExampleData(): ExampleDataModule {
  async function loadExampleData() {
    try {
      state.someDataIsLoading = true;
      const response = await http.get<SomeData>('/api/example');
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

export { useExampleData };
