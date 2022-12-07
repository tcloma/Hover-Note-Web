export const useAwaitPoll = (conditionFn: any, resolvFn: any) => {
   console.log('Await init ⌛');
   const awaitPoll = setInterval(() => {
      console.log('Waiting...');
      const fnResult = conditionFn();
      if (fnResult) {
         clearInterval(awaitPoll);
         resolvFn(fnResult);
      }
   }, 300);
};
