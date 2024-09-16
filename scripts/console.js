// Console

const consoleLog = () => {
    console.clear();
    console.time('Execution time took')
    console.group('Group Title');
    console.log('Message 1');
    console.log('Message 2');
    console.groupEnd();
    console.info('Info');
    console.error('Error');
    console.warn('Warn');
    console.assert(1 === 2, '1 doesn\'t equal 2')
    console.timeEnd('Execution time took')
}

const consoleLogSpan = document.querySelector('#console');
consoleLogSpan.addEventListener('click', () => {
    consoleLog();
})