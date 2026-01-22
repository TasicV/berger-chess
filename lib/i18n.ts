// lib/i18n.ts

export type Language = 'sr' | 'en' | 'de' | 'ru';

export interface Translations {
    common: {
        appTitle: string;
        appSubtitle: string;
        language: string;
        loading: string;
        save: string;
        cancel: string;
        delete: string;
        edit: string;
        add: string;
        update: string;
        close: string;
        yes: string;
        no: string;
        confirm: string;
        required: string;
        optional: string;
        back: string;
        next: string;
        finish: string;
        search: string;
        filter: string;
        sort: string;
        export: string;
        import: string;
        help: string;
        settings: string;
        about: string;
        version: string;
        date: string;
        time: string;
        location: string;
        organizer: string;
        tournament: string;
        player: string;
        players: string;
        round: string;
        rounds: string;
        board: string;
        results: string;
        standings: string;
        schedule: string;
        points: string;
        rating: string;
        federation: string;
        club: string;
        sex: string;
        male: string;
        female: string;
        title: string;
        surname: string;
        name: string;
        number: string;
        position: string;
        wins: string;
        draws: string;
        losses: string;
        bye: string;
        white: string;
        black: string;
        game: string;
        total: string;
        average: string;
        minimum: string;
        maximum: string;
        count: string;
        percent: string;
        all: string;
        none: string;
        selectAll: string;
        clearAll: string;
        apply: string;
        reset: string;
        download: string;
        upload: string;
        print: string;
        copy: string;
        paste: string;
        undo: string;
        redo: string;
        zoomIn: string;
        zoomOut: string;
        fullscreen: string;
        exitFullscreen: string;
        darkMode: string;
        lightMode: string;
        systemMode: string;
        notifications: string;
        profile: string;
        logout: string;
        login: string;
        register: string;
        forgotPassword: string;
        rememberMe: string;
        submit: string;
        success: string;
        error: string;
        warning: string;
        info: string;
        active: string;
        free: string;
        validation: {
            requiredField: string;
            invalidEmail: string;
            invalidPassword: string;
            passwordMismatch: string;
            minLength: string;
            maxLength: string;
            invalidNumber: string;
            invalidDate: string;
            invalidTime: string;
        };
    };
    tournamentSetup: {
        title: string;
        tournamentName: string;
        city: string;
        startDate: string;
        endDate: string;
        timeControl: string;
        doubleRoundRobin: string;
        doubleRoundRobinDesc: string;
        createButton: string;
        editTitle: string;
        editSubtitle: string;
        updateButton: string;
        criteriaTitle: string;
        criteriaMain: string;
        criteriaSubtitle: string;
        criteria1: string;
        criteria2: string;
        criteria3: string;
        criteria4: string;
        placeholders: {
            tournamentName: string;
            city: string;
            organizer: string;
            timeControl: string;
        };
    };
    playerEntry: {
        title: string;
        playerData: string;
        list: string;
        number: string;
        title_field: string;
        surname: string;
        name: string;
        rating: string;
        federation: string;
        club: string;
        sex: string;
        male: string;
        female: string;
        add: string;
        update: string;
        cancel: string;
        delete: string;
        edit: string;
        importBtn: string;
        exportBtn: string;
        helpBtn: string;
        helpTitle: string;
        helpClose: string;
        helpImport: string;
        helpImportDesc: string;
        helpImportFormat: string;
        helpImportExample: string;
        helpExport: string;
        helpExportDesc: string;
        helpAdd: string;
        helpAddDesc: string;
        helpEdit: string;
        helpEditDesc: string;
        helpDelete: string;
        helpDeleteDesc: string;
        importError: string;
        importSuccess: string;
        navigateToSchedule: string;
        scheduleHint: string;
        readyForSchedule: string;
        noPlayers: string;
        requiredFields: string;
        placeholders: {
            surname: string;
            name: string;
            rating: string;
            federation: string;
            club: string;
        };
        titles: {
            GM: string;
            IM: string;
            FM: string;
            CM: string;
            WGM: string;
            WIM: string;
            WFM: string;
            WCM: string;
        };
    };
    schedule: {
        title: string;
        round: string;
        board: string;
        bye: string;
        byeCoffee: string;
        byeTitle: string;
        players: string;
        game: string;
        doubleRound: string;
        firstGame: string;
        secondGame: string;
        white: string;
        black: string;
        enterResult: string;
        noSchedule: string;
        results: {
            win: string;
            loss: string;
            draw: string;
            pending: string;
            notPlayed: string;
            forfeit: string;
        };
        placeholders: {
            selectResult: string;
        };
    };
    standings: {
        title: string;
        position: string;
        number: string;
        name: string;
        rating: string;
        points: string;
        sonneborn: string;
        directEncounter: string;
        wins: string;
        draws: string;
        losses: string;
        whitePoints: string;
        noStandings: string;
        medals: {
            gold: string;
            silver: string;
            bronze: string;
        };
        tooltips: {
            points: string;
            sonneborn: string;
            directEncounter: string;
            wins: string;
            draws: string;
            losses: string;
            whitePoints: string;
        };
    };
    bergerTable: {
        title: string;
        position: string;
        number: string;
        player: string;
        points: string;
        sonneborn: string;
        directEncounter: string;
        wins: string;
        draws: string;
        losses: string;
        whitePoints: string;
        legend: {
            title: string;
            white: string;
            black: string;
            bye: string;
            diagonal: string;
        };
        results: {
            win: string;
            loss: string;
            draw: string;
            bye: string;
        };
    };
    export: {
        title: string;
        tournamentInfo: string;
        standings: string;
        bergerTable: string;
        completeResults: string;
        board: string;
        white: string;
        black: string;
        result: string;
        bye: string;
        generatedBy: string;
        exportDate: string;
        totalPlayers: string;
        totalRounds: string;
        doubleRoundRobin: string;
        singleRoundRobin: string;
        defaultTournamentName: string;
        headers: {
            position: string;
            number: string;
            name: string;
            rating: string;
            points: string;
            sonneborn: string;
            directEncounter: string;
            wins: string;
            draws: string;
            losses: string;
            whitePoints: string;
            round: string;
            table: string;
        };
        placeholders: {
            noResult: string;
        };
        messages: {
            noData: string;
            exportSuccess: string;
            exportError: string;
        };
    };
    navigation: {
        home: string;
        tournament: string;
        players: string;
        schedule: string;
        standings: string;
        settings: string;
        help: string;
        about: string;
        newTournament: string;
        saveTournament: string;
        loadTournament: string;
        exportAll: string;
        importData: string;
        back: string;
        deleteTournament: string;
        editTournament: string;
    };
    messages: {
        errors: {
            noTournament: string;
            noPlayers: string;
            invalidData: string;
            fileTooLarge: string;
            unsupportedFormat: string;
            networkError: string;
            serverError: string;
            unknownError: string;
            noData: string;
            requiredFields: string;
        };
        success: {
            tournamentCreated: string;
            playerAdded: string;
            playerUpdated: string;
            playerDeleted: string;
            resultsUpdated: string;
            dataExported: string;
            dataImported: string;
        };
        confirmations: {
            deletePlayer: string;
            deleteTournament: string;
            resetData: string;
            exportData: string;
            importData: string;
            newTournament: string;
        };
        warnings: {
            unsavedChanges: string;
            incompleteData: string;
            duplicatePlayer: string;
            invalidRating: string;
        };
        info: {
            loading: string;
            processing: string;
            saving: string;
            exporting: string;
            importing: string;
        };
    };
    countries: Record<string, string>;
    chessTitles: Record<string, string>;
}

export const translations: Record<Language, Translations> = {
    sr: {
        common: {
            appTitle: 'Бергер систем паровања',
            appSubtitle: 'Професионални шаховски програм',
            language: 'Језик',
            loading: 'Учитавање...',
            save: 'Сачувај',
            cancel: 'Откажи',
            delete: 'Обриши',
            edit: 'Измени',
            add: 'Додај',
            update: 'Ажурирај',
            close: 'Затвори',
            yes: 'Да',
            no: 'Не',
            confirm: 'Потврди',
            required: 'Обавезно',
            optional: 'Опционо',
            back: 'Назад',
            next: 'Напред',
            finish: 'Заврши',
            search: 'Претрага',
            filter: 'Филтер',
            sort: 'Сортирај',
            export: 'Извези',
            import: 'Увези',
            help: 'Помоћ',
            settings: 'Подешавања',
            about: 'О програму',
            version: 'Верзија',
            date: 'Датум',
            time: 'Време',
            location: 'Локација',
            organizer: 'Организатор',
            tournament: 'Турнир',
            player: 'Играч',
            players: 'Играча',
            round: 'Коло',
            rounds: 'Кола',
            board: 'Табла',
            results: 'Резултати',
            standings: 'Пласман',
            schedule: 'Распоред',
            points: 'Поени',
            rating: 'Рејтинг',
            federation: 'Федерација',
            club: 'Клуб',
            sex: 'Пол',
            male: 'М',
            female: 'Ж',
            title: 'Титула',
            surname: 'Презиме',
            name: 'Име',
            number: 'Број',
            position: 'Позиција',
            wins: 'Победе',
            draws: 'Ремији',
            losses: 'Поразу',
            bye: 'BYE',
            white: 'Бели',
            black: 'Црни',
            game: 'Партија',
            total: 'Укупно',
            average: 'Просек',
            minimum: 'Минимум',
            maximum: 'Максимум',
            count: 'Број',
            percent: 'Проценат',
            all: 'Све',
            none: 'Ништа',
            selectAll: 'Изабери све',
            clearAll: 'Обриши све',
            apply: 'Примени',
            reset: 'Ресетуј',
            download: 'Преузми',
            upload: 'Отпреми',
            print: 'Штампај',
            copy: 'Копирај',
            paste: 'Налепи',
            undo: 'Поништи',
            redo: 'Понови',
            zoomIn: 'Увећај',
            zoomOut: 'Умањи',
            fullscreen: 'Цео екран',
            exitFullscreen: 'Изађи из целог екрана',
            darkMode: 'Тамни режим',
            lightMode: 'Светли режим',
            systemMode: 'Системски режим',
            notifications: 'Обавештења',
            profile: 'Профил',
            logout: 'Одјава',
            login: 'Пријава',
            register: 'Регистрација',
            forgotPassword: 'Заборавили сте лозинку?',
            rememberMe: 'Запамти ме',
            submit: 'Пошаљи',
            success: 'Успех',
            error: 'Грешка',
            warning: 'Упозорење',
            info: 'Информација',
            active: 'Активних',
            free: 'Slobodan',
            validation: {
                requiredField: 'Ово поље је обавезно',
                invalidEmail: 'Неисправна е-пошта',
                invalidPassword: 'Неисправна лозинка',
                passwordMismatch: 'Лозинке се не поклапају',
                minLength: 'Минимална дужина је {min}',
                maxLength: 'Максимална дужина је {max}',
                invalidNumber: 'Неисправан број',
                invalidDate: 'Неисправан датум',
                invalidTime: 'Неисправно време',
            },
        },
        tournamentSetup: {
            title: 'Креирање Новог Турнира',
            tournamentName: 'Назив Турнира',
            city: 'Град/Локација',
            startDate: 'Датум Почетка',
            endDate: 'Датум Завршетка',
            timeControl: 'Темпо Игре',
            doubleRoundRobin: 'Двокружно',
            doubleRoundRobinDesc: 'Сваки играч игра два пута против свог противника',
            createButton: 'Креирај Турнир',
            criteriaTitle: 'Критеријуми за Деобу Места',
            criteriaMain: 'Главни критеријум су увек укупни поени.',
            criteriaSubtitle: 'Додатни критеријуми за деобу (фиксни редослед):',
            criteria1: 'Sonneborn-Berger',
            criteria2: 'Међусобни Сусрет',
            criteria3: 'Више Победа',
            criteria4: 'Поени са Црним Фигурама',
            editTitle: 'Уређивање Турнира',
            editSubtitle: 'Измените податке о турниру',
            updateButton: 'Ажурирај Турнир',
            placeholders: {
                tournamentName: 'Меморијални Турнир',
                city: 'Београд',
                organizer: 'Шаховски Савез',
                timeControl: '90+30',
            },
        },
        playerEntry: {
            title: 'Унос Играча',
            playerData: 'Подаци о играчу',
            list: 'Листа играча',
            number: 'Бр.',
            title_field: 'Титула',
            surname: 'Презиме',
            name: 'Име',
            rating: 'Рејтинг',
            federation: 'Фед',
            club: 'Клуб',
            sex: 'Пол',
            male: 'М',
            female: 'Ж',
            add: 'Додај',
            update: 'Ажурирај',
            cancel: 'Откажи',
            delete: 'Обриши',
            edit: 'Измени',
            importBtn: 'Увези',
            exportBtn: 'Извези',
            helpBtn: 'Помоћ',
            helpTitle: 'Помоћ - Унос играча',
            helpClose: 'Затвори',
            helpImport: 'Увоз играча из TXT фајла',
            helpImportDesc: 'Увезите листу играча из текстуалног фајла. Формат: сваки играч у новом реду, подаци раздвојени тачком-зарезом.',
            helpImportFormat: 'Формат: Титула;Презиме;Име;Рејтинг;Федерација;Клуб;Пол',
            helpImportExample: 'Пример: GM;Popović;Dusan;2500;SRB;Partizan;M',
            helpExport: 'Извоз листе играча',
            helpExportDesc: 'Извезите тренутну листу играча у TXT фајл који можете касније увести.',
            helpAdd: 'Додавање играча',
            helpAddDesc: 'Попуните форму и кликните "Додај" да додате новог играча у листу.',
            helpEdit: 'Измена играча',
            helpEditDesc: 'Кликните на плаву икону оловке поред играча да измените његове податке.',
            helpDelete: 'Брисање играча',
            helpDeleteDesc: 'Кликните на црвену икону корпе да обришете играча из листе.',
            importError: 'Грешка при увозу. Проверите формат фајла.',
            importSuccess: 'Успешно увезено {count} играча!',
            navigateToSchedule: 'Иди на Распоред',
            scheduleHint: 'Ако сте завршили са уносом играча, кликните на дугме испод да пређете на унос резултата.',
            readyForSchedule: 'Спремни за унос резултата?',
            noPlayers: 'Нема унетих играча. Додајте првог играча преко форме изнад.',
            requiredFields: 'Попуни сва обавезна поља',
            placeholders: {
                surname: 'Поповић',
                name: 'Душан',
                rating: '2500',
                federation: 'SRB',
                club: 'Партизан',
            },
            titles: {
                GM: 'GM',
                IM: 'IM',
                FM: 'FM',
                CM: 'CM',
                WGM: 'WGM',
                WIM: 'WIM',
                WFM: 'WFM',
                WCM: 'WCM',
            },
        },
        schedule: {
            title: 'Распоред по Колима',
            round: 'Коло',
            board: 'Табла',
            bye: 'BYE',
            byeCoffee: 'BYE',
            byeTitle: 'Слободни:',
            players: 'играча',
            game: 'Партија',
            doubleRound: 'двокружно',
            firstGame: 'Прва партија',
            secondGame: 'Друга партија',
            white: 'Бели',
            black: 'Црни',
            enterResult: 'Унеси резултат',
            noSchedule: 'Додајте играче да бисте видели распоред.',
            results: {
                win: 'Победа',
                loss: 'Пораз',
                draw: 'Реми',
                pending: 'У току',
                notPlayed: 'Није одиграно',
                forfeit: 'Предаја',
            },
            placeholders: {
                selectResult: '-',
            },
        },
        standings: {
            title: 'Пласман',
            position: 'Поз',
            number: 'Бр',
            name: 'Име',
            rating: 'Ртг',
            points: 'Птс',
            sonneborn: 'SB',
            directEncounter: 'ДС',
            wins: '+',
            draws: '=',
            losses: '-',
            whitePoints: 'Црн',
            noStandings: 'Нема резултата. Унесите резултате мечева.',
            medals: {
                gold: '🥇',
                silver: '🥈',
                bronze: '🥉',
            },
            tooltips: {
                points: 'Укупни поени',
                sonneborn: 'Sonneborn-Berger',
                directEncounter: 'Директан сусрет',
                wins: 'Број победа',
                draws: 'Број ремија',
                losses: 'Број пораза',
                whitePoints: 'Поени са црним фигурама',
            },
        },
        bergerTable: {
            title: 'Берег Табела',
            position: 'Поз',
            number: 'Бр',
            player: 'Играч',
            points: 'Птс',
            sonneborn: 'SB',
            directEncounter: 'ДС',
            wins: '+',
            draws: '=',
            losses: '-',
            whitePoints: 'Црн',
            legend: {
                title: 'Легенда',
                white: 'Бели',
                black: 'Црни',
                bye: 'BYE',
                diagonal: 'Дијагонала',
            },
            results: {
                win: 'Победа',
                loss: 'Пораз',
                draw: 'Реми',
                bye: 'BYE',
            },
        },
        export: {
            title: 'БЕРГЕР ТУРНИР',
            tournamentInfo: 'Информације о турниру',
            standings: 'ПЛАСМАН',
            bergerTable: 'БЕРГЕР ТАБЕЛА',
            completeResults: 'КОМПЛЕТНИ РЕЗУЛТАТИ ПО КОЛИМА',
            board: 'Табла',
            white: 'Бели',
            black: 'Црни',
            result: 'Резултат',
            bye: 'BYE',
            generatedBy: 'Изгенерисано помоћу Berger Tournament Manager',
            exportDate: 'Датум извоза',
            totalPlayers: 'Укупно играча',
            totalRounds: 'Укупно кола',
            doubleRoundRobin: 'двокружно',
            singleRoundRobin: 'једнокружно',
            defaultTournamentName: 'Berger Tournament',
            headers: {
                position: 'Поз',
                number: 'Бр',
                name: 'Име',
                rating: 'Ртг',
                points: 'Птс',
                sonneborn: 'SB',
                directEncounter: 'DE',
                wins: '+',
                draws: '=',
                losses: '-',
                whitePoints: 'Црн',
                round: 'Коло',
                table: 'Табла',
            },
            placeholders: {
                noResult: '-',
            },
            messages: {
                noData: 'Нема података за извоз!',
                exportSuccess: 'Извоз успешно завршен',
                exportError: 'Грешка при извозу',
            },
        },
        navigation: {
            home: 'Почетна',
            tournament: 'Турнир',
            players: 'Играчи',
            schedule: 'Распоред',
            standings: 'Пласман',
            settings: 'Подешавања',
            help: 'Помоћ',
            about: 'О програму',
            newTournament: 'Нови Турнир',
            saveTournament: 'Сачувај Турнир',
            loadTournament: 'Учитај Турнир',
            exportAll: 'Експорт Укупно',
            importData: 'Увези Податке',
            editTournament: "Уреди Турнир",
            back: "Назад",
            deleteTournament: "Обриши Турнир"
        },
        messages: {
            errors: {
                noTournament: 'Прво креирајте турнир',
                noPlayers: 'Нема играча',
                invalidData: 'Неисправни подаци',
                fileTooLarge: 'Фајл је превелик',
                unsupportedFormat: 'Неподржан формат',
                networkError: 'Грешка мреже',
                serverError: 'Грешка сервера',
                unknownError: 'Непозната грешка',
                noData: 'Нема Података',
                requiredFields: 'Попуни сва обавезна поља',
            },
            success: {
                tournamentCreated: 'Турнир успешно креиран',
                playerAdded: 'Играч успешно додат',
                playerUpdated: 'Играч успешно ажуриран',
                playerDeleted: 'Играч успешно обрисан',
                resultsUpdated: 'Резултати успешно ажурирани',
                dataExported: 'Подаци успешно извезени',
                dataImported: 'Подаци успешно увезени',
            },
            confirmations: {
                deletePlayer: 'Да ли сте сигурни да желите да обришете овог играча?',
                resetData: 'Да ли сте сигурни да желите да ресетујете све податке?',
                exportData: 'Да ли желите да извезете податке?',
                importData: 'Да ли желите да увезете податке?',
                deleteTournament: 'Да ли сте сигурни да желите да обришете овај турнир?',
                newTournament: 'Да ли сте сигурни да желите да креирате нови турнир? Тренутни подаци ће бити изгубљени.',
            },
            warnings: {
                unsavedChanges: 'Имате несачуване промене',
                incompleteData: 'Недостају неки подаци',
                duplicatePlayer: 'Играч већ постоји',
                invalidRating: 'Неисправан рејтинг',
            },
            info: {
                loading: 'Учитавање...',
                processing: 'Обрада...',
                saving: 'Чување...',
                exporting: 'Извоз...',
                importing: 'Увоз...',
            },
        },
        countries: {
            SRB: 'Србија',
            USA: 'Сједињене Државе',
            GER: 'Немачка',
            RUS: 'Русија',
            FRA: 'Француска',
            ESP: 'Шпанија',
            ITA: 'Италија',
            UK: 'Уједињено Краљевство',
            CHN: 'Кина',
            IND: 'Индија',
        },
        chessTitles: {
            GM: 'Велемајстор',
            IM: 'Међународни мајстор',
            FM: 'ФИДЕ мајстор',
            CM: 'Кандидат мајстор',
            WGM: 'Женски велемајстор',
            WIM: 'Женски међународни мајстор',
            WFM: 'Женски ФИДЕ мајстор',
            WCM: 'Женски кандидат мајстор',
        },
    },
    en: {
        common: {
            appTitle: 'Berger Tournament',
            appSubtitle: 'Professional tournament management',
            language: 'Language',
            loading: 'Loading...',
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            add: 'Add',
            update: 'Update',
            close: 'Close',
            yes: 'Yes',
            no: 'No',
            confirm: 'Confirm',
            required: 'Required',
            optional: 'Optional',
            back: 'Back',
            next: 'Next',
            finish: 'Finish',
            search: 'Search',
            filter: 'Filter',
            sort: 'Sort',
            export: 'Export',
            import: 'Import',
            help: 'Help',
            settings: 'Settings',
            about: 'About',
            version: 'Version',
            date: 'Date',
            time: 'Time',
            location: 'Location',
            organizer: 'Organizer',
            tournament: 'Tournament',
            player: 'Player',
            players: 'Players',
            round: 'Round',
            rounds: 'Rounds',
            board: 'Board',
            results: 'Results',
            standings: 'Standings',
            schedule: 'Schedule',
            points: 'Points',
            rating: 'Rating',
            federation: 'Federation',
            club: 'Club',
            sex: 'Sex',
            male: 'M',
            female: 'F',
            title: 'Title',
            surname: 'Surname',
            name: 'Name',
            number: 'Number',
            position: 'Position',
            wins: 'Wins',
            draws: 'Draws',
            losses: 'Losses',
            bye: 'BYE',
            white: 'White',
            black: 'Black',
            game: 'Game',
            total: 'Total',
            average: 'Average',
            minimum: 'Minimum',
            maximum: 'Maximum',
            count: 'Count',
            percent: 'Percent',
            all: 'All',
            none: 'None',
            selectAll: 'Select All',
            clearAll: 'Clear All',
            apply: 'Apply',
            reset: 'Reset',
            download: 'Download',
            upload: 'Upload',
            print: 'Print',
            copy: 'Copy',
            paste: 'Paste',
            undo: 'Undo',
            redo: 'Redo',
            zoomIn: 'Zoom In',
            zoomOut: 'Zoom Out',
            fullscreen: 'Fullscreen',
            exitFullscreen: 'Exit Fullscreen',
            darkMode: 'Dark Mode',
            lightMode: 'Light Mode',
            systemMode: 'System Mode',
            notifications: 'Notifications',
            profile: 'Profile',
            logout: 'Logout',
            login: 'Login',
            register: 'Register',
            forgotPassword: 'Forgot Password?',
            rememberMe: 'Remember Me',
            submit: 'Submit',
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Info',
            active: 'Active',
            free: 'Free',
            validation: {
                requiredField: 'This field is required',
                invalidEmail: 'Invalid email',
                invalidPassword: 'Invalid password',
                passwordMismatch: 'Passwords do not match',
                minLength: 'Minimum length is {min}',
                maxLength: 'Maximum length is {max}',
                invalidNumber: 'Invalid number',
                invalidDate: 'Invalid date',
                invalidTime: 'Invalid time',
            },
        },
        tournamentSetup: {
            title: 'Create New Tournament',
            tournamentName: 'Tournament Name',
            city: 'City/Location',
            startDate: 'Start Date',
            endDate: 'End Date',
            timeControl: 'Time Control',
            doubleRoundRobin: 'Double Round-Robin',
            doubleRoundRobinDesc: 'Each player plays twice against each opponent',
            createButton: 'Create Tournament',
            criteriaTitle: 'Tiebreak Criteria',
            criteriaMain: 'The main criterion is always total points.',
            criteriaSubtitle: 'Additional tiebreak criteria (fixed order):',
            criteria1: 'Sonneborn-Berger',
            criteria2: 'Direct Encounter',
            criteria3: 'More Wins',
            criteria4: 'Points with Black Pieces',
            editTitle: 'Edit Tournament',
            editSubtitle: 'Edit tournament details',
            updateButton: 'Update Tournament',
            placeholders: {
                tournamentName: 'Memorial Tournament',
                city: 'Belgrade',
                organizer: 'Chess Federation',
                timeControl: '90+30',
            },
        },
        playerEntry: {
            title: 'Player Entry',
            playerData: 'Player Data',
            list: 'Players List',
            number: 'No.',
            title_field: 'Title',
            surname: 'Surname',
            name: 'Name',
            rating: 'Rating',
            federation: 'Fed',
            club: 'Club',
            sex: 'Sex',
            male: 'M',
            female: 'F',
            add: 'Add',
            update: 'Update',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            importBtn: 'Import',
            exportBtn: 'Export',
            helpBtn: 'Help',
            helpTitle: 'Help - Player Entry',
            helpClose: 'Close',
            helpImport: 'Import players from TXT file',
            helpImportDesc: 'Import a list of players from a text file. Format: each player on a new line, data separated by semicolon.',
            helpImportFormat: 'Format: Title;Surname;Name;Rating;Federation;Club;Sex',
            helpImportExample: 'Example: GM;Popovic;Dusan;2500;SRB;Partizan;M',
            helpExport: 'Export player list',
            helpExportDesc: 'Export the current player list to a TXT file that you can import later.',
            helpAdd: 'Adding players',
            helpAddDesc: 'Fill out the form and click "Add" to add a new player to the list.',
            helpEdit: 'Editing players',
            helpEditDesc: 'Click the blue pencil icon next to a player to edit their data.',
            helpDelete: 'Deleting players',
            helpDeleteDesc: 'Click the red trash icon to delete a player from the list.',
            importError: 'Import error. Check file format.',
            importSuccess: 'Successfully imported {count} players!',
            navigateToSchedule: 'Go to Schedule',
            scheduleHint: 'If you have finished adding players, click the button below to proceed to entering results.',
            readyForSchedule: 'Ready to enter results?',
            noPlayers: 'No players added. Add the first player using the form above.',
            requiredFields: 'Please fill in all required fields',
            placeholders: {
                surname: 'Smith',
                name: 'John',
                rating: '2400',
                federation: 'USA',
                club: 'Chess Club',
            },
            titles: {
                GM: 'GM',
                IM: 'IM',
                FM: 'FM',
                CM: 'CM',
                WGM: 'WGM',
                WIM: 'WIM',
                WFM: 'WFM',
                WCM: 'WCM',
            },
        },
        schedule: {
            title: 'Round-Robin Schedule',
            round: 'Round',
            board: 'Board',
            bye: 'BYE',
            byeCoffee: 'BYE',
            byeTitle: 'Players with BYE:',
            players: 'players',
            game: 'Game',
            doubleRound: 'double round',
            firstGame: 'First game',
            secondGame: 'Second game',
            white: 'White',
            black: 'Black',
            enterResult: 'Enter result',
            noSchedule: 'Add players to see the schedule.',
            results: {
                win: 'Win',
                loss: 'Loss',
                draw: 'Draw',
                pending: 'Pending',
                notPlayed: 'Not Played',
                forfeit: 'Forfeit',
            },
            placeholders: {
                selectResult: '-',
            },
        },
        standings: {
            title: 'Standings',
            position: 'Pos',
            number: 'No',
            name: 'Name',
            rating: 'Rtg',
            points: 'Pts',
            sonneborn: 'SB',
            directEncounter: 'DE',
            wins: '+',
            draws: '=',
            losses: '-',
            whitePoints: 'Blk',
            noStandings: 'No standings. Enter match results.',
            medals: {
                gold: '🥇',
                silver: '🥈',
                bronze: '🥉',
            },
            tooltips: {
                points: 'Total points',
                sonneborn: 'Sonneborn-Berger',
                directEncounter: 'Direct Encounter',
                wins: 'Number of wins',
                draws: 'Number of draws',
                losses: 'Number of losses',
                whitePoints: 'Points with black pieces',
            },
        },
        bergerTable: {
            title: 'Berger Table',
            position: 'Pos',
            number: 'No',
            player: 'Player',
            points: 'Pts',
            sonneborn: 'SB',
            directEncounter: 'DE',
            wins: '+',
            draws: '=',
            losses: '-',
            whitePoints: 'Blk',
            legend: {
                title: 'Legend',
                white: 'White',
                black: 'Black',
                bye: 'BYE',
                diagonal: 'Diagonal',
            },
            results: {
                win: 'Win',
                loss: 'Loss',
                draw: 'Draw',
                bye: 'BYE',
            },
        },
        export: {
            title: 'BERGER TOURNAMENT',
            tournamentInfo: 'Tournament Information',
            standings: 'STANDINGS',
            bergerTable: 'BERGER TABLE',
            completeResults: 'COMPLETE RESULTS BY ROUNDS',
            board: 'Board',
            white: 'White',
            black: 'Black',
            result: 'Result',
            bye: 'BYE',
            generatedBy: 'Generated by Berger Tournament Manager',
            exportDate: 'Export Date',
            totalPlayers: 'Total Players',
            totalRounds: 'Total Rounds',
            doubleRoundRobin: 'double round-robin',
            singleRoundRobin: 'single round-robin',
            defaultTournamentName: 'Berger Tournament',
            headers: {
                position: 'Pos',
                number: 'No',
                name: 'Name',
                rating: 'Rtg',
                points: 'Pts',
                sonneborn: 'SB',
                directEncounter: 'DE',
                wins: '+',
                draws: '=',
                losses: '-',
                whitePoints: 'Blk',
                round: 'Round',
                table: 'Board',
            },
            placeholders: {
                noResult: '-',
            },
            messages: {
                noData: 'No data to export!',
                exportSuccess: 'Export completed successfully',
                exportError: 'Export error',
            },
        },
        navigation: {
            home: 'Home',
            tournament: 'Tournament',
            players: 'Players',
            schedule: 'Schedule',
            standings: 'Standings',
            settings: 'Settings',
            help: 'Help',
            about: 'About',
            newTournament: 'New Tournament',
            saveTournament: 'Save Tournament',
            loadTournament: 'Load Tournament',
            exportAll: 'Export All',
            importData: 'Import Data',
            editTournament: "Edit Tournament",
            back: "Back",
            deleteTournament: "Delete Tournament"
        },
        messages: {
            errors: {
                noTournament: 'Create a tournament first',
                noPlayers: 'No players',
                invalidData: 'Invalid data',
                fileTooLarge: 'File too large',
                unsupportedFormat: 'Unsupported format',
                networkError: 'Network error',
                serverError: 'Server error',
                unknownError: 'Unknown error',
                noData: 'No data',
                requiredFields: 'Please fill in all required fields',
            },
            success: {
                tournamentCreated: 'Tournament created successfully',
                playerAdded: 'Player added successfully',
                playerUpdated: 'Player updated successfully',
                playerDeleted: 'Player deleted successfully',
                resultsUpdated: 'Results updated successfully',
                dataExported: 'Data exported successfully',
                dataImported: 'Data imported successfully',
            },
            confirmations: {
                deletePlayer: 'Are you sure you want to delete this player?',
                resetData: 'Are you sure you want to reset all data?',
                exportData: 'Do you want to export the data?',
                importData: 'Do you want to import data?',
                deleteTournament: 'Are you sure you want to delete this tournament?',
                newTournament: 'Are you sure you want to create a new tournament? Current data will be lost.'
            },
            warnings: {
                unsavedChanges: 'You have unsaved changes',
                incompleteData: 'Some data is missing',
                duplicatePlayer: 'Player already exists',
                invalidRating: 'Invalid rating',
            },
            info: {
                loading: 'Loading...',
                processing: 'Processing...',
                saving: 'Saving...',
                exporting: 'Exporting...',
                importing: 'Importing...',
            },
        },
        countries: {
            SRB: 'Serbia',
            USA: 'United States',
            GER: 'Germany',
            RUS: 'Russia',
            FRA: 'France',
            ESP: 'Spain',
            ITA: 'Italy',
            UK: 'United Kingdom',
            CHN: 'China',
            IND: 'India',
        },
        chessTitles: {
            GM: 'Grandmaster',
            IM: 'International Master',
            FM: 'FIDE Master',
            CM: 'Candidate Master',
            WGM: 'Woman Grandmaster',
            WIM: 'Woman International Master',
            WFM: 'Woman FIDE Master',
            WCM: 'Woman Candidate Master',
        },
    },
    de: {
        common: {
            appTitle: 'Berger Turnier',
            appSubtitle: 'Professionelle Turnierverwaltung',
            language: 'Sprache',
            loading: 'Lädt...',
            save: 'Speichern',
            cancel: 'Abbrechen',
            delete: 'Löschen',
            edit: 'Bearbeiten',
            add: 'Hinzufügen',
            update: 'Aktualisieren',
            close: 'Schließen',
            yes: 'Ja',
            no: 'Nein',
            confirm: 'Bestätigen',
            required: 'Erforderlich',
            optional: 'Optional',
            back: 'Zurück',
            next: 'Weiter',
            finish: 'Beenden',
            search: 'Suchen',
            filter: 'Filtern',
            sort: 'Sortieren',
            export: 'Exportieren',
            import: 'Importieren',
            help: 'Hilfe',
            settings: 'Einstellungen',
            about: 'Über',
            version: 'Version',
            date: 'Datum',
            time: 'Zeit',
            location: 'Ort',
            organizer: 'Veranstalter',
            tournament: 'Turnier',
            player: 'Spieler',
            players: 'Spieler',
            round: 'Runde',
            rounds: 'Runden',
            board: 'Tisch',
            results: 'Ergebnisse',
            standings: 'Tabelle',
            schedule: 'Turnierplan',
            points: 'Punkte',
            rating: 'Wertung',
            federation: 'Verband',
            club: 'Verein',
            sex: 'Geschlecht',
            male: 'M',
            female: 'W',
            title: 'Titel',
            surname: 'Nachname',
            name: 'Vorname',
            number: 'Nr.',
            position: 'Position',
            wins: 'Siege',
            draws: 'Unentschieden',
            losses: 'Niederlagen',
            bye: 'FREILOS',
            white: 'Weiß',
            black: 'Schwarz',
            game: 'Partie',
            total: 'Gesamt',
            average: 'Durchschnitt',
            minimum: 'Minimum',
            maximum: 'Maximum',
            count: 'Anzahl',
            percent: 'Prozent',
            all: 'Alle',
            none: 'Keine',
            selectAll: 'Alle auswählen',
            clearAll: 'Alle abwählen',
            apply: 'Anwenden',
            reset: 'Zurücksetzen',
            download: 'Herunterladen',
            upload: 'Hochladen',
            print: 'Drucken',
            copy: 'Kopieren',
            paste: 'Einfügen',
            undo: 'Rückgängig',
            redo: 'Wiederholen',
            zoomIn: 'Vergrößern',
            zoomOut: 'Verkleinern',
            fullscreen: 'Vollbild',
            exitFullscreen: 'Vollbild beenden',
            darkMode: 'Dunkler Modus',
            lightMode: 'Heller Modus',
            systemMode: 'Systemmodus',
            notifications: 'Benachrichtigungen',
            profile: 'Profil',
            logout: 'Abmelden',
            login: 'Anmelden',
            register: 'Registrieren',
            forgotPassword: 'Passwort vergessen?',
            rememberMe: 'Angemeldet bleiben',
            submit: 'Absenden',
            success: 'Erfolg',
            error: 'Fehler',
            warning: 'Warnung',
            info: 'Info',
            active: 'Aktiv',
            free: 'Frei',
            validation: {
                requiredField: 'Dieses Feld ist erforderlich',
                invalidEmail: 'Ungültige E-Mail',
                invalidPassword: 'Ungültiges Passwort',
                passwordMismatch: 'Passwörter stimmen nicht überein',
                minLength: 'Mindestlänge ist {min}',
                maxLength: 'Maximallänge ist {max}',
                invalidNumber: 'Ungültige Zahl',
                invalidDate: 'Ungültiges Datum',
                invalidTime: 'Ungültige Zeit',
            },
        },
        tournamentSetup: {
            title: 'Neues Turnier erstellen',
            tournamentName: 'Turniername',
            city: 'Stadt/Ort',
            startDate: 'Startdatum',
            endDate: 'Enddatum',
            timeControl: 'Bedenkzeit',
            doubleRoundRobin: 'Doppelrundenturnier',
            doubleRoundRobinDesc: 'Jeder Spieler spielt zweimal gegen jeden Gegner',
            createButton: 'Turnier erstellen',
            criteriaTitle: 'Feinwertungskriterien',
            criteriaMain: 'Das Hauptkriterium ist immer die Gesamtpunktzahl.',
            criteriaSubtitle: 'Zusätzliche Feinwertungskriterien (feste Reihenfolge):',
            criteria1: 'Sonneborn-Berger',
            criteria2: 'Direkter Vergleich',
            criteria3: 'Mehr Siege',
            criteria4: 'Punkte mit Schwarz',
            editTitle: 'Turnier bearbeiten',
            editSubtitle: 'Turnierdetails bearbeiten',
            updateButton: 'Turnier aktualisieren',
            placeholders: {
                tournamentName: 'Gedenkturnier',
                city: 'Berlin',
                organizer: 'Schachverband',
                timeControl: '90+30',
            },
        },
        playerEntry: {
            title: 'Spielereingabe',
            playerData: 'Spielerdaten',
            list: 'Spielerliste',
            number: 'Nr.',
            title_field: 'Titel',
            surname: 'Nachname',
            name: 'Vorname',
            rating: 'Wertung',
            federation: 'Verb.',
            club: 'Verein',
            sex: 'Geschl.',
            male: 'M',
            female: 'W',
            add: 'Hinzufügen',
            update: 'Aktualisieren',
            cancel: 'Abbrechen',
            delete: 'Löschen',
            edit: 'Bearbeiten',
            importBtn: 'Import',
            exportBtn: 'Export',
            helpBtn: 'Hilfe',
            helpTitle: 'Hilfe - Spielereingabe',
            helpClose: 'Schließen',
            helpImport: 'Spieler aus TXT-Datei importieren',
            helpImportDesc: 'Importieren Sie eine Spielerliste aus einer Textdatei. Format: jeder Spieler in einer neuen Zeile, Daten durch Semikolon getrennt.',
            helpImportFormat: 'Format: Titel;Nachname;Vorname;Wertung;Verband;Verein;Geschlecht',
            helpImportExample: 'Beispiel: GM;Popovic;Dusan;2500;SRB;Partizan;M',
            helpExport: 'Spielerliste exportieren',
            helpExportDesc: 'Exportieren Sie die aktuelle Spielerliste in eine TXT-Datei.',
            helpAdd: 'Spieler hinzufügen',
            helpAddDesc: 'Füllen Sie das Formular aus und klicken Sie auf "Hinzufügen".',
            helpEdit: 'Spieler bearbeiten',
            helpEditDesc: 'Klicken Sie auf das blaue Stiftsymbol, um Daten zu bearbeiten.',
            helpDelete: 'Spieler löschen',
            helpDeleteDesc: 'Klicken Sie auf das rote Papierkorbsymbol zum Löschen.',
            importError: 'Importfehler. Überprüfen Sie das Dateiformat.',
            importSuccess: '{count} Spieler erfolgreich importiert!',
            navigateToSchedule: 'Zum Turnierplan',
            scheduleHint: 'Wenn Sie mit dem Hinzufügen von Spielern fertig sind, klicken Sie auf die Schaltfläche unten, um mit der Eingabe von Ergebnissen fortzufahren.',
            readyForSchedule: 'Bereit für die Eingabe von Ergebnissen?',
            noPlayers: 'Keine Spieler vorhanden. Fügen Sie den ersten Spieler über das Formular hinzu.',
            requiredFields: 'Bitte füllen Sie alle erforderlichen Felder aus',
            placeholders: {
                surname: 'Müller',
                name: 'Hans',
                rating: '2400',
                federation: 'GER',
                club: 'Schachclub',
            },
            titles: {
                GM: 'GM',
                IM: 'IM',
                FM: 'FM',
                CM: 'CM',
                WGM: 'WGM',
                WIM: 'WIM',
                WFM: 'WFM',
                WCM: 'WCM',
            },
        },
        schedule: {
            title: 'Turnierplan',
            round: 'Runde',
            board: 'Tisch',
            bye: 'FREILOS',
            byeCoffee: 'FREILOS',
            byeTitle: 'Spieler mit Freilos:',
            players: 'Spieler',
            game: 'Partie',
            doubleRound: 'Doppelrunde',
            firstGame: 'Erste Partie',
            secondGame: 'Zweite Partie',
            white: 'Weiß',
            black: 'Schwarz',
            enterResult: 'Ergebnis eingeben',
            noSchedule: 'Fügen Sie Spieler hinzu, um den Turnierplan zu sehen.',
            results: {
                win: 'Sieg',
                loss: 'Niederlage',
                draw: 'Unentschieden',
                pending: 'Ausstehend',
                notPlayed: 'Nicht gespielt',
                forfeit: 'Aufgabe',
            },
            placeholders: {
                selectResult: '-',
            },
        },
        standings: {
            title: 'Tabelle',
            position: 'Pos',
            number: 'Nr',
            name: 'Name',
            rating: 'Wrtg',
            points: 'Pts',
            sonneborn: 'SB',
            directEncounter: 'DA',
            wins: '+',
            draws: '=',
            losses: '-',
            whitePoints: 'Schw',
            noStandings: 'Keine Tabelle. Geben Sie Spielergebnisse ein.',
            medals: {
                gold: '🥇',
                silver: '🥈',
                bronze: '🥉',
            },
            tooltips: {
                points: 'Gesamtpunkte',
                sonneborn: 'Sonneborn-Berger',
                directEncounter: 'Direktes Aufeinandertreffen',
                wins: 'Anzahl Siege',
                draws: 'Anzahl Unentschieden',
                losses: 'Anzahl Niederlagen',
                whitePoints: 'Punkte mit schwarz',
            },
        },
        bergerTable: {
            title: 'Berger Tabelle',
            position: 'Pos',
            number: 'Nr',
            player: 'Spieler',
            points: 'Pts',
            sonneborn: 'SB',
            directEncounter: 'DA',
            wins: '+',
            draws: '=',
            losses: '-',
            whitePoints: 'Schw',
            legend: {
                title: 'Legende',
                white: 'Weiß',
                black: 'Schwarz',
                bye: 'FREILOS',
                diagonal: 'Diagonale',
            },
            results: {
                win: 'Sieg',
                loss: 'Niederlage',
                draw: 'Unentschieden',
                bye: 'FREILOS',
            },
        },
        export: {
            title: 'BERGER TURNIER',
            tournamentInfo: 'Turnierinformationen',
            standings: 'TABELLE',
            bergerTable: 'BERGER TABELLE',
            completeResults: 'VOLLSTÄNDIGE ERGEBNISSE NACH RUNDEN',
            board: 'Tisch',
            white: 'Weiß',
            black: 'Schwarz',
            result: 'Ergebnis',
            bye: 'FREILOS',
            generatedBy: 'Erstellt mit Berger Tournament Manager',
            exportDate: 'Exportdatum',
            totalPlayers: 'Gesamtspieler',
            totalRounds: 'Gesamttrunden',
            doubleRoundRobin: 'doppeltes Rundenturnier',
            singleRoundRobin: 'einfaches Rundenturnier',
            defaultTournamentName: 'Berger Turnier',
            headers: {
                position: 'Pos',
                number: 'Nr',
                name: 'Name',
                rating: 'Wrtg',
                points: 'Pts',
                sonneborn: 'SB',
                directEncounter: 'DE',
                wins: '+',
                draws: '=',
                losses: '-',
                whitePoints: 'Schw',
                round: 'Runde',
                table: 'Tisch',
            },
            placeholders: {
                noResult: '-',
            },
            messages: {
                noData: 'Keine Daten zum Exportieren!',
                exportSuccess: 'Export erfolgreich abgeschlossen',
                exportError: 'Exportfehler',
            },
        },
        navigation: {
            home: 'Start',
            tournament: 'Turnier',
            players: 'Spieler',
            schedule: 'Turnierplan',
            standings: 'Tabelle',
            settings: 'Einstellungen',
            help: 'Hilfe',
            about: 'Über',
            newTournament: 'Neues Turnier',
            saveTournament: 'Turnier speichern',
            loadTournament: 'Turnier laden',
            exportAll: 'Alles exportieren',
            importData: 'Daten importieren',
            editTournament: 'Turnier bearbeiten',
            back: 'Zurück',
            deleteTournament: 'Turnier löschen'
        },
        messages: {
            errors: {
                noTournament: 'Erstellen Sie zuerst ein Turnier',
                noPlayers: 'Keine Spieler',
                invalidData: 'Ungültige Daten',
                fileTooLarge: 'Datei zu groß',
                unsupportedFormat: 'Nicht unterstütztes Format',
                networkError: 'Netzwerkfehler',
                serverError: 'Serverfehler',
                unknownError: 'Unbekannter Fehler',
                noData: 'Keine Daten',
                requiredFields: 'Bitte füllen Sie alle erforderlichen Felder aus',
            },
            success: {
                tournamentCreated: 'Turnier erfolgreich erstellt',
                playerAdded: 'Spieler erfolgreich hinzugefügt',
                playerUpdated: 'Spieler erfolgreich aktualisiert',
                playerDeleted: 'Spieler erfolgreich gelöscht',
                resultsUpdated: 'Ergebnisse erfolgreich aktualisiert',
                dataExported: 'Daten erfolgreich exportiert',
                dataImported: 'Daten erfolgreich importiert',
            },
            confirmations: {
                deletePlayer: 'Möchten Sie diesen Spieler wirklich löschen?',
                resetData: 'Möchten Sie wirklich alle Daten zurücksetzen?',
                exportData: 'Möchten Sie die Daten exportieren?',
                importData: 'Möchten Sie Daten importieren?',
                deleteTournament: 'Sind Sie sicher, dass Sie dieses Turnier löschen möchten?',
                newTournament: 'Sind Sie sicher, dass Sie ein neues Turnier erstellen möchten? Aktuelle Daten gehen verloren.'
            },
            warnings: {
                unsavedChanges: 'Sie haben ungespeicherte Änderungen',
                incompleteData: 'Einige Daten fehlen',
                duplicatePlayer: 'Spieler existiert bereits',
                invalidRating: 'Ungültige Wertung',
            },
            info: {
                loading: 'Lädt...',
                processing: 'Verarbeitet...',
                saving: 'Speichert...',
                exporting: 'Exportiert...',
                importing: 'Importiert...',
            },
        },
        countries: {
            SRB: 'Serbien',
            USA: 'Vereinigte Staaten',
            GER: 'Deutschland',
            RUS: 'Russland',
            FRA: 'Frankreich',
            ESP: 'Spanien',
            ITA: 'Italien',
            UK: 'Vereinigtes Königreich',
            CHN: 'China',
            IND: 'Indien',
        },
        chessTitles: {
            GM: 'Großmeister',
            IM: 'Internationaler Meister',
            FM: 'FIDE-Meister',
            CM: 'Kandidatenmeister',
            WGM: 'Großmeisterin',
            WIM: 'Internationale Meisterin',
            WFM: 'FIDE-Meisterin',
            WCM: 'Kandidatenmeisterin',
        },
    },
    ru: {
        common: {
            appTitle: 'Турнир Бергера',
            appSubtitle: 'Профессиональное управление турнирами',
            language: 'Язык',
            loading: 'Загрузка...',
            save: 'Сохранить',
            cancel: 'Отмена',
            delete: 'Удалить',
            edit: 'Изменить',
            add: 'Добавить',
            update: 'Обновить',
            close: 'Закрыть',
            yes: 'Да',
            no: 'Нет',
            confirm: 'Подтвердить',
            required: 'Обязательно',
            optional: 'Опционально',
            back: 'Назад',
            next: 'Вперед',
            finish: 'Завершить',
            search: 'Поиск',
            filter: 'Фильтр',
            sort: 'Сортировать',
            export: 'Экспорт',
            import: 'Импорт',
            help: 'Помощь',
            settings: 'Настройки',
            about: 'О программе',
            version: 'Версия',
            date: 'Дата',
            time: 'Время',
            location: 'Место',
            organizer: 'Организатор',
            tournament: 'Турнир',
            player: 'Игрок',
            players: 'Игроки',
            round: 'Тур',
            rounds: 'Туры',
            board: 'Доска',
            results: 'Результаты',
            standings: 'Таблица',
            schedule: 'Расписание',
            points: 'Очки',
            rating: 'Рейтинг',
            federation: 'Федерация',
            club: 'Клуб',
            sex: 'Пол',
            male: 'М',
            female: 'Ж',
            title: 'Звание',
            surname: 'Фамилия',
            name: 'Имя',
            number: 'Номер',
            position: 'Позиция',
            wins: 'Победы',
            draws: 'Ничьи',
            losses: 'Поражения',
            bye: 'BYE',
            white: 'Белые',
            black: 'Чёрные',
            game: 'Партия',
            total: 'Всего',
            average: 'Среднее',
            minimum: 'Минимум',
            maximum: 'Максимум',
            count: 'Количество',
            percent: 'Процент',
            all: 'Все',
            none: 'Нет',
            selectAll: 'Выбрать все',
            clearAll: 'Очистить все',
            apply: 'Применить',
            reset: 'Сбросить',
            download: 'Скачать',
            upload: 'Загрузить',
            print: 'Печать',
            copy: 'Копировать',
            paste: 'Вставить',
            undo: 'Отменить',
            redo: 'Повторить',
            zoomIn: 'Увеличить',
            zoomOut: 'Уменьшить',
            fullscreen: 'Полный экран',
            exitFullscreen: 'Выйти из полного экрана',
            darkMode: 'Тёмный режим',
            lightMode: 'Светлый режим',
            systemMode: 'Системный режим',
            notifications: 'Уведомления',
            profile: 'Профиль',
            logout: 'Выйти',
            login: 'Войти',
            register: 'Регистрация',
            forgotPassword: 'Забыли пароль?',
            rememberMe: 'Запомнить меня',
            submit: 'Отправить',
            success: 'Успех',
            error: 'Ошибка',
            warning: 'Предупреждение',
            info: 'Информация',
            active: 'Активных',
            free: 'Свободный',
            validation: {
                requiredField: 'Это поле обязательно',
                invalidEmail: 'Неверный email',
                invalidPassword: 'Неверный пароль',
                passwordMismatch: 'Пароли не совпадают',
                minLength: 'Минимальная длина {min}',
                maxLength: 'Максимальная длина {max}',
                invalidNumber: 'Неверное число',
                invalidDate: 'Неверная дата',
                invalidTime: 'Неверное время',
            },
        },
        tournamentSetup: {
            title: 'Создать новый турнир',
            tournamentName: 'Название турнира',
            city: 'Город/Место',
            startDate: 'Дата начала',
            endDate: 'Дата окончания',
            timeControl: 'Контроль времени',
            doubleRoundRobin: 'Двухкруговой турнир',
            doubleRoundRobinDesc: 'Каждый игрок играет дважды с каждым противником',
            createButton: 'Создать турнир',
            criteriaTitle: 'Критерии разделения мест',
            criteriaMain: 'Основным критерием всегда являются общие очки.',
            criteriaSubtitle: 'Дополнительные критерии разделения (фиксированный порядок):',
            criteria1: 'Зонненборн-Бергер',
            criteria2: 'Личная встреча',
            criteria3: 'Больше побед',
            criteria4: 'Очки чёрными фигурами',
            editTitle: 'Редактирование Турнира',
            editSubtitle: 'Изменить данные турнира',
            updateButton: 'Обновить Турнир',
            placeholders: {
                tournamentName: 'Мемориальный турнир',
                city: 'Москва',
                organizer: 'Шахматная федерация',
                timeControl: '90+30',
            },
        },
        playerEntry: {
            title: 'Ввод игроков',
            playerData: 'Данные игрока',
            list: 'Список игроков',
            number: '№',
            title_field: 'Звание',
            surname: 'Фамилия',
            name: 'Имя',
            rating: 'Рейтинг',
            federation: 'Фед',
            club: 'Клуб',
            sex: 'Пол',
            male: 'М',
            female: 'Ж',
            add: 'Добавить',
            update: 'Обновить',
            cancel: 'Отмена',
            delete: 'Удалить',
            edit: 'Изменить',
            importBtn: 'Импорт',
            exportBtn: 'Экспорт',
            helpBtn: 'Помощь',
            helpTitle: 'Помощь - Ввод игроков',
            helpClose: 'Закрыть',
            helpImport: 'Импорт игроков из TXT файла',
            helpImportDesc: 'Импортируйте список игроков из текстового файла. Формат: каждый игрок в новой строке, данные разделены точкой с запятой.',
            helpImportFormat: 'Формат: Звание;Фамилия;Имя;Рейтинг;Федерация;Клуб;Пол',
            helpImportExample: 'Пример: GM;Popovic;Dusan;2500;SRB;Partizan;M',
            helpExport: 'Экспорт списка игроков',
            helpExportDesc: 'Экспортируйте текущий список игроков в TXT файл.',
            helpAdd: 'Добавление игроков',
            helpAddDesc: 'Заполните форму и нажмите "Добавить".',
            helpEdit: 'Редактирование игроков',
            helpEditDesc: 'Нажмите на синий значок карандаша для редактирования.',
            helpDelete: 'Удаление игроков',
            helpDeleteDesc: 'Нажмите на красный значок корзины для удаления.',
            importError: 'Ошибка импорта. Проверьте формат файла.',
            importSuccess: 'Успешно импортировано {count} игроков!',
            navigateToSchedule: 'Перейти к Расписанию',
            scheduleHint: 'Если вы закончили добавление игроков, нажмите кнопку ниже, чтобы перейти к вводу результатов.',
            readyForSchedule: 'Готовы вводить результаты?',
            noPlayers: 'Нет игроков. Добавьте первого игрока с помощью формы выше.',
            requiredFields: 'Пожалуйста, заполните все обязательные поля',
            placeholders: {
                surname: 'Иванов',
                name: 'Иван',
                rating: '2500',
                federation: 'RUS',
                club: 'Шахматный клуб',
            },
            titles: {
                GM: 'GM',
                IM: 'IM',
                FM: 'FM',
                CM: 'CM',
                WGM: 'WGM',
                WIM: 'WIM',
                WFM: 'WFM',
                WCM: 'WCM',
            },
        },
        schedule: {
            title: 'Расписание турнира',
            round: 'Тур',
            board: 'Доска',
            bye: 'BYE',
            byeCoffee: 'BYE',
            byeTitle: 'Свободные:',
            players: 'игроков',
            game: 'Партия',
            doubleRound: 'двухкруговой',
            firstGame: 'Первая партия',
            secondGame: 'Вторая партия',
            white: 'Белые',
            black: 'Чёрные',
            enterResult: 'Ввести результат',
            noSchedule: 'Добавьте игроков, чтобы увидеть расписание.',
            results: {
                win: 'Победа',
                loss: 'Поражение',
                draw: 'Ничья',
                pending: 'В процессе',
                notPlayed: 'Не сыграно',
                forfeit: 'Сдача',
            },
            placeholders: {
                selectResult: '-',
            },
        },
        standings: {
            title: 'Таблица',
            position: 'Поз',
            number: '№',
            name: 'Имя',
            rating: 'Рейт',
            points: 'Очк',
            sonneborn: 'SB',
            directEncounter: 'ПВ',
            wins: '+',
            draws: '=',
            losses: '-',
            whitePoints: 'Чёр',
            noStandings: 'Нет таблицы. Введите результаты матчей.',
            medals: {
                gold: '🥇',
                silver: '🥈',
                bronze: '🥉',
            },
            tooltips: {
                points: 'Всего очков',
                sonneborn: 'Зонненборн-Бергер',
                directEncounter: 'Прямая встреча',
                wins: 'Количество побед',
                draws: 'Количество ничьих',
                losses: 'Количество поражений',
                whitePoints: 'Очки чёрными',
            },
        },
        bergerTable: {
            title: 'Таблица Бергера',
            position: 'Поз',
            number: '№',
            player: 'Игрок',
            points: 'Очк',
            sonneborn: 'SB',
            directEncounter: 'ПВ',
            wins: '+',
            draws: '=',
            losses: '-',
            whitePoints: 'Чёр',
            legend: {
                title: 'Легенда',
                white: 'Белые',
                black: 'Чёрные',
                bye: 'BYE',
                diagonal: 'Диагональ',
            },
            results: {
                win: 'Победа',
                loss: 'Поражение',
                draw: 'Ничья',
                bye: 'BYE',
            },
        },
        export: {
            title: 'ТУРНИР БЕРГЕРА',
            tournamentInfo: 'Информация о турнире',
            standings: 'ТАБЛИЦА',
            bergerTable: 'ТАБЛИЦА БЕРГЕРА',
            completeResults: 'ПОЛНЫЕ РЕЗУЛЬТАТЫ ПО ТУРАМ',
            board: 'Доска',
            white: 'Белые',
            black: 'Чёрные',
            result: 'Результат',
            bye: 'BYE',
            generatedBy: 'Создано с помощью Berger Tournament Manager',
            exportDate: 'Дата экспорта',
            totalPlayers: 'Всего игроков',
            totalRounds: 'Всего туров',
            doubleRoundRobin: 'двухкруговой',
            singleRoundRobin: 'однокруговой',
            defaultTournamentName: 'Турнир Бергера',
            headers: {
                position: 'Поз',
                number: '№',
                name: 'Имя',
                rating: 'Рейт',
                points: 'Очк',
                sonneborn: 'SB',
                directEncounter: 'DE',
                wins: '+',
                draws: '=',
                losses: '-',
                whitePoints: 'Чёр',
                round: 'Тур',
                table: 'Доска',
            },
            placeholders: {
                noResult: '-',
            },
            messages: {
                noData: 'Нет данных для экспорта!',
                exportSuccess: 'Экспорт успешно завершён',
                exportError: 'Ошибка экспорта',
            },
        },
        navigation: {
            home: 'Главная',
            tournament: 'Турнир',
            players: 'Игроки',
            schedule: 'Расписание',
            standings: 'Таблица',
            settings: 'Настройки',
            help: 'Помощь',
            about: 'О программе',
            newTournament: 'Новый турнир',
            saveTournament: 'Сохранить турнир',
            loadTournament: 'Загрузить турнир',
            exportAll: 'Экспорт всего',
            importData: 'Импорт данных',
            editTournament: 'Редактировать Турнир',
            back: 'Назад',
            deleteTournament: 'Удалить Турнир'
        },
        messages: {
            errors: {
                noTournament: 'Сначала создайте турнир',
                noPlayers: 'Нет игроков',
                invalidData: 'Неверные данные',
                fileTooLarge: 'Файл слишком большой',
                unsupportedFormat: 'Неподдерживаемый формат',
                networkError: 'Ошибка сети',
                serverError: 'Ошибка сервера',
                unknownError: 'Неизвестная ошибка',
                noData: 'Нет данных',
                requiredFields: 'Пожалуйста, заполните все обязательные поля',
            },
            success: {
                tournamentCreated: 'Турнир успешно создан',
                playerAdded: 'Игрок успешно добавлен',
                playerUpdated: 'Игрок успешно обновлён',
                playerDeleted: 'Игрок успешно удалён',
                resultsUpdated: 'Результаты успешно обновлены',
                dataExported: 'Данные успешно экспортированы',
                dataImported: 'Данные успешно импортированы',
            },
            confirmations: {
                deletePlayer: 'Вы уверены, что хотите удалить этого игрока?',
                resetData: 'Вы уверены, что хотите сбросить все данные?',
                exportData: 'Вы хотите экспортировать данные?',
                importData: 'Вы хотите импортировать данные?',
                deleteTournament: 'Вы уверены, что хотите удалить этот турнир?',
                newTournament: 'Вы уверены, что хотите создать новый турнир? Текущие данные будут потеряны.'
            },
            warnings: {
                unsavedChanges: 'У вас есть несохранённые изменения',
                incompleteData: 'Некоторые данные отсутствуют',
                duplicatePlayer: 'Игрок уже существует',
                invalidRating: 'Неверный рейтинг',
            },
            info: {
                loading: 'Загрузка...',
                processing: 'Обработка...',
                saving: 'Сохранение...',
                exporting: 'Экспорт...',
                importing: 'Импорт...',
            },
        },
        countries: {
            SRB: 'Сербия',
            USA: 'США',
            GER: 'Германия',
            RUS: 'Россия',
            FRA: 'Франция',
            ESP: 'Испания',
            ITA: 'Италия',
            UK: 'Великобритания',
            CHN: 'Китай',
            IND: 'Индия',
        },
        chessTitles: {
            GM: 'Гроссмейстер',
            IM: 'Международный мастер',
            FM: 'Мастер ФИДЕ',
            CM: 'Кандидат в мастера',
            WGM: 'Женский гроссмейстер',
            WIM: 'Женский международный мастер',
            WFM: 'Женский мастер ФИДЕ',
            WCM: 'Женский кандидат в мастера',
        },
    },
};

// Helper function to get translations with fallback
export function getTranslation(lang: Language, key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // Fallback to English if translation not found
            value = translations.en;
            for (const k2 of keys) {
                if (value && typeof value === 'object' && k2 in value) {
                    value = value[k2];
                } else {
                    return key; // Return key if not found even in English
                }
            }
        }
    }

    return typeof value === 'string' ? value : key;
}

// Helper function for templated strings
export function getTranslationWithParams(lang: Language, key: string, params: Record<string, string>): string {
    let text = getTranslation(lang, key);

    for (const [param, value] of Object.entries(params)) {
        text = text.replace(`{${param}}`, value);
    }

    return text;
}

export default translations;