import { Ref } from 'vue'
import { Message } from '../utils'
import { IPage } from '../types'




export type ITableConfig<T extends Record<string, never>> = {
  border: boolean;
  stripe: boolean;
  pagination: boolean;
  data: T[];
  pageSize: number;
  tableRef: Ref<never>;
  fetchData: (params?: Record<string, never>) => Promise<T[]>;
  searchData?: (params?: Record<string, never>) => Promise<T[]>;
};



const useTable = (config: ITableConfig<never> = {}) => {
  const { tableRef, border, stripe, pagination, data, columns, pageSize = 10, fetchData, searchData } = config;

  const getData = async (params?: Record<string, never>) => {
    if (tableRef.value) {
      tableRef.value.loading = true;
      const { code, data, message } = await fetchData(params);
      if (code === 200) {
        const { resultList } = data;
        tableRef.value.data = resultList || [];
        tableRef.value.loading = false;
      } else {
        Message.warning(message);
        tableRef.value.data = [];
        tableRef.value.loading = false;
      }
    }
  };

  const handleSearch = async (val: string) => {
    if (tableRef.value && searchData) {
      const queryBean = {
        property: val,
      };
      const { code, data, message } = await searchData(queryBean);
      tableRef.value.loading = true;
      if (code === 200) {
        const { resultList } = data;
        tableRef.value.data = resultList || [];
        tableRef.value.loading = false;
      } else {
        Message.warning(message);
        tableRef.value.data = [];
        tableRef.value.loading = false;
      }
    }
  };

  const getPageData = async (params: IPage) => {
    const { index, size } = params;
    const queryBean = {
      index,
      size,
    };
    await getData(queryBean);
  };

  const filterData = async (params?: Record<string, never>) => {
    if (!params) return;
    await getData(params);
  };

  const filterPageData = async (params?: IPage<Record<string, never>>) => {
    if (!params) return;
    const { index, size, data } = params;
    const queryBean = {
      index,
      size,
      data,
    };
    await getPageData(queryBean);
  };


  const resetData = () => {
    if (tableRef.value) {
      tableRef.value.data = [];
      tableRef.value.loading = false;
    }
  };

  const onSearch = async (val: string) => {
    if (searchData && val.trim() !== '') {
      await handleSearch(val);
    } else {
      Message.warning('请输入搜索内容');
    }
  };


  return {
    resetData,
    getPageData,
    filterData,
    getData,
    filterPageData,
    onSearch
  };
};


export default useTable;
