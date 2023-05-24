import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { QuestionType } from '../../../types/QuestionType';
import Question from '../../../components/Question';



type Props = {
    questions: QuestionType[] | undefined,
    refetch: () => Promise<void>
}
const QuestionList: React.FC<Props> = ({ questions, refetch }) => {
    const [refreshList, setRefreshList] = useState(false)

    const handleRefresh = async () => {
        setRefreshList(true)
        await refetch()
        setRefreshList(false)
    }

    return (
        <FlatList
            contentContainerStyle={{ padding: '5%' }}
            data={questions}
            renderItem={({ item }) => <Question item={item} />}
            refreshing={refreshList}
            onRefresh={handleRefresh}
        />
    )
}

export default QuestionList;