
export default function accessFactory(initialState) {
    console.log(initialState)
    const { userId, role } = initialState;

    return {
        isRoot: false,
    };
}