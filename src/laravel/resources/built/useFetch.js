import { ref, isRef, watchEffect } from 'vue';
// eslint-disable-next-line import/prefer-default-export
export function useFetch(url) {
    const data = ref('vaklmm');
    const error = ref(null);
    const doFetch = () => { };
    if (isRef(url)) {
        watchEffect(doFetch);
    }
    else {
        doFetch();
    }
    return {
        data,
        error,
    };
}
//# sourceMappingURL=useFetch.js.map