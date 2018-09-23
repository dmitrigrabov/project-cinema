const languages = "CSS JS HTML PHP Perl Java Python Redux TypeScript MongoDB, RxJS".split(" ");

const reserved = "Redux TypeScript MongoDB, RxJS".split(" ")

Array.prototype.siftOut = function(ignore) {
    return this.filter(item => ignore.indexOf(item) < 0);
}

const result = languages.sif(reserved);

console.log(result);