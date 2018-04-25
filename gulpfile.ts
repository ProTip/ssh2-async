
import {Gulpclass, Task, SequenceTask, MergedTask} from 'gulpclass'

import Gulp from 'gulp'
import Shell from 'gulp-shell'
import TS from 'gulp-typescript'

const Del = require('del')

@Gulpclass()
export class Gulpfile {
    @Task()
    clean(cb: Function) {
        return Del(['./dist/**'], cb)
    }

    @MergedTask()
    compile() {
        const proj = TS.createProject("tsconfig.json", { typescript: require("typescript") })
        const tsResult = Gulp.src(["./*.ts", "./node_modules/@types/**/*.ts", "!gulpfile.ts"])
            .pipe(proj())

        return [
            tsResult.dts.pipe(Gulp.dest("./dist")),
            tsResult.js.pipe(Gulp.dest("./dist"))
        ];
    }

    @Task()
    copyPackageFile() {
        return Gulp.src("./package.json")
            .pipe(Gulp.dest("./dist"));
    }


    @SequenceTask()
    package() {
        return [
            "clean",
            "compile",
            "copyPackageFile"
        ]
    }
}