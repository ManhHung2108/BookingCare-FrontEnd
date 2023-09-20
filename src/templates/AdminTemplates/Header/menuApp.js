export const adminMenu = [
    {
        //quản lý người dùng
        name: "menu.admin.manage-user",
        menus: [
            // {
            //     name: "menu.admin.crud",
            //     link: "/system/user-manage",
            // },
            {
                name: "menu.admin.crud-redux",
                // link: "/system/user-manage-redux",
                link: "/system/user-manage",
            },
            {
                name: "menu.admin.manage-doctor",
                link: "/system/manage-doctor",
                // subMenus: [
                //     {
                // name: "menu.system.system-administrator.user-manage",
                // link: "/system/user-manage",
                //     },
                // {
                //     name: "menu.system.system-administrator.user-manage-redux",
                //     link: "/system/user-manage-redux",
                // },
                // ],
            },
            {
                name: "menu.admin.manage-admin",
                link: "/system/manage-admin",
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ],
    },
    {
        //quản lý phòng khám
        name: "menu.admin.clinic",
        menus: [
            {
                name: "menu.admin.manage-clinic",
                link: "/system/manage-clinic",
            },
        ],
    },
    {
        //quản lý chuyên khoa
        name: "menu.admin.specialty",
        menus: [
            {
                name: "menu.admin.manage-specialty",
                link: "/system/manage-specialty",
            },
        ],
    },
    {
        //quản lý phòng khám
        name: "menu.admin.handbook",
        menus: [
            {
                name: "menu.admin.manage-handbook",
                link: "/system/manage-handbook",
            },
        ],
    },
];
